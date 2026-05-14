"""
Generate the NaviSense vest GLB with Blender.

Run from the repo root:
    blender --background --python assets/navisense-vest-blender/create_navisense_vest.py

This script is intentionally Blender-first. It uses real Blender primitives,
modifiers, bevels, weighted normals and light procedural cloth displacement
instead of the old Three.js placeholder geometry.
"""

from __future__ import annotations

import math
import shutil
from pathlib import Path

import bpy


ASSET_DIR = Path(__file__).resolve().parent
REPO_ROOT = ASSET_DIR.parents[1]
EXPORT_DIR = ASSET_DIR / "exports"
PUBLIC_MODELS = REPO_ROOT / "public" / "models"

CONTRACT_GROUPS = [
    "vest_body",
    "electronics_box",
    "controller",
    "battery",
    "depth_sensors",
    "haptic_motors",
    "gps_phone_link",
]


def blender_point(coords: tuple[float, float, float]) -> tuple[float, float, float]:
    """Convert website-style coordinates (x, height, depth) to Blender (x, depth, height)."""
    x, height, depth = coords
    return (x, depth, height)


def blender_scale(coords: tuple[float, float, float]) -> tuple[float, float, float]:
    width, height, depth = coords
    return (width, depth, height)


def blender_rotation(coords: tuple[float, float, float]) -> tuple[float, float, float]:
    x_rot, height_rot, depth_rot = coords
    return (x_rot, depth_rot, height_rot)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def profile_value(profile: list[tuple[float, float]], height: float) -> float:
    if height <= profile[0][0]:
        return profile[0][1]
    if height >= profile[-1][0]:
        return profile[-1][1]

    for index in range(1, len(profile)):
        prev_height, prev_value = profile[index - 1]
        next_height, next_value = profile[index]
        if height <= next_height:
            t = (height - prev_height) / (next_height - prev_height)
            return lerp(prev_value, next_value, t)

    return profile[-1][1]


def ensure_dirs() -> None:
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_MODELS.mkdir(parents=True, exist_ok=True)


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def material(name: str, color: tuple[float, float, float, float], roughness: float = 0.85, metallic: float = 0.0) -> bpy.types.Material:
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
    return mat


def make_empty(name: str, parent: bpy.types.Object | None = None) -> bpy.types.Object:
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.parent = parent
    return obj


def assign(obj: bpy.types.Object, mat: bpy.types.Material) -> bpy.types.Object:
    obj.data.materials.append(mat)
    return obj


def shade_smooth(obj: bpy.types.Object) -> None:
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.shade_smooth()
    finally:
        obj.select_set(False)


def add_weighted_normals(obj: bpy.types.Object) -> None:
    modifier = obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    modifier.keep_sharp = True


def add_bevel(obj: bpy.types.Object, width: float, segments: int = 4) -> None:
    modifier = obj.modifiers.new("soft_bevel", "BEVEL")
    modifier.width = width
    modifier.segments = segments
    modifier.affect = "EDGES"
    add_weighted_normals(obj)


def add_cloth_noise(obj: bpy.types.Object, strength: float = 0.012, size: float = 1.6) -> None:
    texture = bpy.data.textures.new(f"{obj.name}_cloth_noise", type="VORONOI")
    texture.noise_scale = size
    texture.intensity = 0.22
    modifier = obj.modifiers.new("subtle_fabric_grain", "DISPLACE")
    modifier.strength = strength
    modifier.texture = texture


def cube_obj(
    name: str,
    parent: bpy.types.Object,
    loc: tuple[float, float, float],
    scale: tuple[float, float, float],
    mat: bpy.types.Material,
    rot: tuple[float, float, float] = (0.0, 0.0, 0.0),
    bevel: float = 0.02,
    bevel_segments: int = 3,
) -> bpy.types.Object:
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.mesh.primitive_cube_add(size=1, location=blender_point(loc), rotation=blender_rotation(rot))
    obj = bpy.context.object
    obj.name = name
    obj.parent = parent
    obj.dimensions = blender_scale(scale)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    assign(obj, mat)
    if bevel:
        add_bevel(obj, bevel, bevel_segments)
    return obj


def ellipsoid_obj(
    name: str,
    parent: bpy.types.Object,
    loc: tuple[float, float, float],
    scale: tuple[float, float, float],
    mat: bpy.types.Material,
    segments: int = 48,
    rings: int = 20,
    rot: tuple[float, float, float] = (0.0, 0.0, 0.0),
    cloth: bool = False,
) -> bpy.types.Object:
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=segments,
        ring_count=rings,
        location=blender_point(loc),
        rotation=blender_rotation(rot),
    )
    obj = bpy.context.object
    obj.name = name
    obj.parent = parent
    obj.scale = blender_scale(scale)
    assign(obj, mat)
    shade_smooth(obj)
    if cloth:
        add_cloth_noise(obj, 0.008, 1.2)
    add_weighted_normals(obj)
    return obj


def cylinder_obj(
    name: str,
    parent: bpy.types.Object,
    loc: tuple[float, float, float],
    radius: float,
    depth: float,
    mat: bpy.types.Material,
    vertices: int = 32,
    rot: tuple[float, float, float] = (0.0, 0.0, 0.0),
) -> bpy.types.Object:
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices,
        radius=radius,
        depth=depth,
        location=blender_point(loc),
        rotation=blender_rotation(rot),
    )
    obj = bpy.context.object
    obj.name = name
    obj.parent = parent
    assign(obj, mat)
    shade_smooth(obj)
    add_bevel(obj, radius * 0.08, 2)
    return obj


def curve_tube(
    name: str,
    parent: bpy.types.Object,
    points: list[tuple[float, float, float]],
    mat: bpy.types.Material,
    bevel_depth: float = 0.012,
    resolution: int = 3,
) -> bpy.types.Object:
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = resolution
    curve.bevel_depth = bevel_depth
    curve.bevel_resolution = 3

    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for point, coords in zip(spline.points, points):
        converted = blender_point(coords)
        point.co = (converted[0], converted[1], converted[2], 1)

    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.parent = parent
    obj.data.materials.append(mat)

    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    mesh_obj = bpy.context.object
    mesh_obj.name = name
    mesh_obj.parent = parent
    shade_smooth(mesh_obj)
    return mesh_obj


def padded_panel_mesh(
    name: str,
    parent: bpy.types.Object,
    side: int,
    mat: bpy.types.Material,
) -> bpy.types.Object:
    """Create one half of the vest as a shaped padded shell, not an oval primitive."""
    rows = 24
    cols = 8
    min_height = -0.86
    max_height = 0.78
    outer_profile = [
        (-0.86, 0.50),
        (-0.64, 0.61),
        (-0.28, 0.67),
        (0.18, 0.65),
        (0.52, 0.56),
        (0.78, 0.38),
    ]
    inner_profile = [
        (-0.86, 0.04),
        (-0.38, 0.045),
        (0.18, 0.06),
        (0.46, 0.14),
        (0.64, 0.23),
        (0.78, 0.31),
    ]

    front_vertices: list[tuple[float, float, float]] = []
    rear_vertices: list[tuple[float, float, float]] = []

    for row in range(rows):
        v = row / (rows - 1)
        height = lerp(min_height, max_height, v)
        outer = profile_value(outer_profile, height)
        inner = profile_value(inner_profile, height)

        for col in range(cols):
            u = col / (cols - 1)
            local_width = math.sin(math.pi * u)
            vertical_crown = math.sin(math.pi * v)
            x = side * lerp(inner, outer, u)
            fabric_crown = 0.052 * local_width * (0.45 + 0.55 * vertical_crown)
            front_depth = 0.155 + fabric_crown
            rear_depth = -0.115 + fabric_crown * 0.18
            front_vertices.append(blender_point((x, height, front_depth)))
            rear_vertices.append(blender_point((x, height, rear_depth)))

    vertices = front_vertices + rear_vertices
    faces: list[tuple[int, ...]] = []

    def front_index(row: int, col: int) -> int:
        return row * cols + col

    def rear_index(row: int, col: int) -> int:
        return rows * cols + row * cols + col

    for row in range(rows - 1):
        for col in range(cols - 1):
            faces.append((
                front_index(row, col),
                front_index(row, col + 1),
                front_index(row + 1, col + 1),
                front_index(row + 1, col),
            ))
            faces.append((
                rear_index(row + 1, col),
                rear_index(row + 1, col + 1),
                rear_index(row, col + 1),
                rear_index(row, col),
            ))

    for row in range(rows - 1):
        faces.append((front_index(row, 0), front_index(row + 1, 0), rear_index(row + 1, 0), rear_index(row, 0)))
        faces.append((
            front_index(row + 1, cols - 1),
            front_index(row, cols - 1),
            rear_index(row, cols - 1),
            rear_index(row + 1, cols - 1),
        ))

    for col in range(cols - 1):
        faces.append((front_index(0, col + 1), front_index(0, col), rear_index(0, col), rear_index(0, col + 1)))
        faces.append((
            front_index(rows - 1, col),
            front_index(rows - 1, col + 1),
            rear_index(rows - 1, col + 1),
            rear_index(rows - 1, col),
        ))

    mesh = bpy.data.meshes.new(f"{name}_mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()

    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.parent = parent
    obj.data.materials.append(mat)
    shade_smooth(obj)
    add_bevel(obj, 0.018, 3)
    add_cloth_noise(obj, 0.004, 1.1)
    return obj


def vest_edge_points(
    side: int,
    profile: list[tuple[float, float]],
    depth: float,
) -> list[tuple[float, float, float]]:
    return [(side * width, height, depth) for height, width in profile]


def build_vest_body(parent: bpy.types.Object, mats: dict[str, bpy.types.Material]) -> bpy.types.Object:
    vest = make_empty("vest_body", parent)

    padded_panel_mesh("front_left_ballistic_panel", vest, -1, mats["fabric"])
    padded_panel_mesh("front_right_ballistic_panel", vest, 1, mats["fabric"])

    # A flatter rear shell gives real thickness without turning the front into a round blob.
    cube_obj("rear_upper_back_panel", vest, (0, 0.2, -0.14), (1.08, 1.05, 0.1), mats["fabric_dark"], (0, 0, 0), 0.16, 8)
    cube_obj("rear_lower_back_panel", vest, (0, -0.56, -0.12), (1.18, 0.5, 0.11), mats["fabric_dark"], (0, 0, 0), 0.13, 7)

    outer_profile = [
        (-0.86, 0.50),
        (-0.64, 0.61),
        (-0.28, 0.67),
        (0.18, 0.65),
        (0.52, 0.56),
        (0.78, 0.38),
    ]
    inner_profile = [
        (-0.86, 0.04),
        (-0.38, 0.045),
        (0.18, 0.06),
        (0.46, 0.14),
        (0.64, 0.23),
        (0.78, 0.31),
    ]

    curve_tube("left_outer_binding", vest, vest_edge_points(-1, outer_profile, 0.22), mats["edge"], 0.018)
    curve_tube("right_outer_binding", vest, vest_edge_points(1, outer_profile, 0.22), mats["edge"], 0.018)
    curve_tube("left_front_zip_edge", vest, vest_edge_points(-1, inner_profile, 0.235), mats["zipper"], 0.012)
    curve_tube("right_front_zip_edge", vest, vest_edge_points(1, inner_profile, 0.235), mats["zipper"], 0.012)
    curve_tube("u_neck_soft_binding", vest, [(-0.32, 0.78, 0.24), (-0.18, 0.62, 0.255), (0, 0.56, 0.265), (0.18, 0.62, 0.255), (0.32, 0.78, 0.24)], mats["edge"], 0.023)
    curve_tube("left_armhole_binding", vest, [(-0.55, 0.62, 0.2), (-0.7, 0.22, 0.18), (-0.68, -0.28, 0.17), (-0.58, -0.72, 0.16)], mats["edge"], 0.018)
    curve_tube("right_armhole_binding", vest, [(0.55, 0.62, 0.2), (0.7, 0.22, 0.18), (0.68, -0.28, 0.17), (0.58, -0.72, 0.16)], mats["edge"], 0.018)

    # Shoulder pads, side bands, waist band.
    cube_obj("left_shoulder_pad", vest, (-0.42, 0.88, 0.08), (0.24, 0.36, 0.13), mats["webbing"], (0.03, 0.0, -0.16), 0.055, 5)
    cube_obj("right_shoulder_pad", vest, (0.42, 0.88, 0.08), (0.24, 0.36, 0.13), mats["webbing"], (0.03, 0.0, 0.16), 0.055, 5)
    cube_obj("left_side_adjustment_panel", vest, (-0.72, -0.13, 0.02), (0.12, 0.62, 0.14), mats["webbing"], (0, 0, 0.02), 0.035, 4)
    cube_obj("right_side_adjustment_panel", vest, (0.72, -0.13, 0.02), (0.12, 0.62, 0.14), mats["webbing"], (0, 0, -0.02), 0.035, 4)
    cube_obj("left_side_strap_top", vest, (-0.78, 0.16, 0.13), (0.22, 0.065, 0.065), mats["edge"], (0, 0, 0), 0.018, 2)
    cube_obj("left_side_strap_lower", vest, (-0.78, -0.34, 0.13), (0.22, 0.065, 0.065), mats["edge"], (0, 0, 0), 0.018, 2)
    cube_obj("right_side_strap_top", vest, (0.78, 0.16, 0.13), (0.22, 0.065, 0.065), mats["edge"], (0, 0, 0), 0.018, 2)
    cube_obj("right_side_strap_lower", vest, (0.78, -0.34, 0.13), (0.22, 0.065, 0.065), mats["edge"], (0, 0, 0), 0.018, 2)
    cube_obj("lower_waist_belt", vest, (0, -0.8, 0.13), (1.18, 0.12, 0.12), mats["webbing"], (0, 0, 0), 0.045, 4)

    # Front details: zipper, MOLLE rows and small fabric panels.
    cube_obj("center_zipper_track", vest, (0, -0.2, 0.255), (0.044, 1.12, 0.02), mats["zipper"], (0, 0, 0), 0.009, 2)
    cube_obj("center_navisense_status_line", vest, (0.042, -0.2, 0.278), (0.01, 0.78, 0.012), mats["cyan"], (0, 0, 0), 0.004, 1)
    for index, y in enumerate([0.34, 0.14, -0.06, -0.28, -0.5]):
        width = 1.0 if index < 3 else 0.84
        cube_obj(f"molle_front_row_{index + 1}", vest, (0, y, 0.268), (width, 0.032, 0.02), mats["edge"], (0, 0, 0), 0.008, 1)
        for x in [-0.42, -0.2, 0.2, 0.42]:
            cube_obj(f"molle_loop_{index + 1}_{x:+.2f}", vest, (x, y + 0.024, 0.292), (0.062, 0.03, 0.015), mats["webbing"], (0, 0, 0), 0.004, 1)

    cube_obj("left_upper_plate_seam", vest, (-0.33, 0.5, 0.27), (0.28, 0.028, 0.016), mats["edge"], (0, 0, -0.16), 0.006, 1)
    cube_obj("right_upper_plate_seam", vest, (0.33, 0.5, 0.27), (0.28, 0.028, 0.016), mats["edge"], (0, 0, 0.16), 0.006, 1)

    return vest


def build_hardware(parent: bpy.types.Object, mats: dict[str, bpy.types.Material]) -> None:
    box = make_empty("electronics_box", parent)
    cube_obj("side_electronics_case", box, (0, 0, 0), (0.32, 0.62, 0.18), mats["device"], (0, 0, 0), 0.065, 6)
    cube_obj("side_electronics_lid", box, (0.015, 0, 0.105), (0.25, 0.45, 0.035), mats["device_face"], (0, 0, 0), 0.035, 4)
    cube_obj("side_status_light", box, (-0.11, 0, 0.135), (0.028, 0.3, 0.012), mats["cyan"], (0, 0, 0), 0.004, 1)
    box.location = blender_point((0.94, 0.02, 0.22))

    controller = make_empty("controller", parent)
    cube_obj("controller_pcb", controller, (0, 0, 0), (0.28, 0.18, 0.04), mats["board"], (0, 0, 0), 0.018, 2)
    cube_obj("controller_chip", controller, (0.02, 0.015, 0.04), (0.11, 0.08, 0.03), mats["device"], (0, 0, 0), 0.008, 1)
    cylinder_obj("controller_port", controller, (-0.105, -0.045, 0.046), 0.02, 0.03, mats["cyan"], 14, (math.pi / 2, 0, 0))
    controller.location = blender_point((0.94, 0.18, 0.38))

    battery = make_empty("battery", parent)
    cube_obj("battery_pack", battery, (0, 0, 0), (0.2, 0.34, 0.1), mats["battery"], (0, 0, 0), 0.028, 3)
    cube_obj("battery_label", battery, (0, 0, 0.058), (0.13, 0.13, 0.012), mats["webbing"], (0, 0, 0), 0.006, 1)
    cube_obj("battery_terminal", battery, (0, 0.18, 0.01), (0.09, 0.026, 0.08), mats["cyan"], (0, 0, 0), 0.006, 1)
    battery.location = blender_point((0.94, -0.22, 0.38))

    sensors = make_empty("depth_sensors", parent)
    curve_tube("sensor_bridge", sensors, [(-0.46, 0.48, 0.32), (0, 0.51, 0.35), (0.46, 0.48, 0.32)], mats["webbing"], 0.02)
    for side, label in [(-1, "left"), (1, "right")]:
        x = side * 0.46
        cylinder_obj(f"{label}_sensor_housing", sensors, (x, 0.48, 0.35), 0.08, 0.065, mats["device"], 22, (math.pi / 2, 0, 0))
        cylinder_obj(f"{label}_depth_lens", sensors, (x, 0.48, 0.39), 0.044, 0.07, mats["cyan"], 18, (math.pi / 2, 0, 0))

    motors = make_empty("haptic_motors", parent)
    for x, y, label in [(-0.48, -0.3, "left"), (0.48, -0.3, "right"), (0, -0.58, "lower")]:
        cylinder_obj(f"{label}_haptic_motor", motors, (x, y, 0.32), 0.05, 0.1, mats["motor"], 18, (math.pi / 2, 0, 0))

    phone = make_empty("gps_phone_link", parent)
    cube_obj("phone_body", phone, (0, 0, 0), (0.22, 0.48, 0.05), mats["phone"], (0, 0, 0), 0.028, 4)
    cube_obj("phone_screen", phone, (0, 0.01, 0.035), (0.17, 0.34, 0.012), mats["device_face"], (0, 0, 0), 0.012, 2)
    cube_obj("phone_nav_line", phone, (0, -0.12, 0.05), (0.12, 0.016, 0.012), mats["cyan"], (0, 0, 0), 0.004, 1)
    phone.location = blender_point((-0.96, -0.04, 0.22))


def create_materials() -> dict[str, bpy.types.Material]:
    return {
        "fabric": material("mat_dark_ballistic_fabric", (0.13, 0.15, 0.18, 1), 0.92),
        "fabric_dark": material("mat_black_webbing", (0.055, 0.07, 0.085, 1), 0.94),
        "webbing": material("mat_raised_webbing", (0.08, 0.1, 0.12, 1), 0.9),
        "edge": material("mat_soft_edge_binding", (0.25, 0.29, 0.33, 1), 0.88),
        "zipper": material("mat_zipped_center_track", (0.045, 0.055, 0.07, 1), 0.8),
        "cyan": material("mat_navisense_cyan_accent", (0.37, 0.66, 0.91, 1), 0.48),
        "device": material("mat_side_device_shell", (0.07, 0.085, 0.105, 1), 0.68),
        "device_face": material("mat_device_face", (0.15, 0.18, 0.22, 1), 0.72),
        "board": material("mat_controller_board", (0.05, 0.16, 0.25, 1), 0.58),
        "battery": material("mat_battery_pack", (0.18, 0.21, 0.26, 1), 0.78),
        "motor": material("mat_haptic_motor", (0.45, 0.39, 0.83, 1), 0.6),
        "phone": material("mat_phone_black", (0.025, 0.035, 0.055, 1), 0.5),
    }


def add_lighting() -> None:
    bpy.ops.object.light_add(type="AREA", location=(0, -3.2, 4.2))
    key = bpy.context.object
    key.name = "asset_key_area_light"
    key.data.energy = 450
    key.data.size = 4

    bpy.ops.object.light_add(type="POINT", location=(-2.4, -1.8, 2.1))
    cyan = bpy.context.object
    cyan.name = "cyan_rim_light"
    cyan.data.color = (0.35, 0.78, 1.0)
    cyan.data.energy = 80


def export_assets() -> None:
    glb_export = EXPORT_DIR / "navisense-vest.glb"
    public_glb = PUBLIC_MODELS / "navisense-vest.glb"

    bpy.ops.export_scene.gltf(
        filepath=str(glb_export),
        export_format="GLB",
        export_yup=True,
        export_apply=True,
        export_animations=False,
        export_materials="EXPORT",
    )

    poster = make_poster_svg()
    poster_export = EXPORT_DIR / "navisense-vest-poster.svg"
    poster_export.write_text(poster, encoding="utf-8")

    shutil.copyfile(glb_export, public_glb)
    shutil.copyfile(poster_export, PUBLIC_MODELS / "navisense-vest-poster.svg")


def validate_contract(root: bpy.types.Object) -> None:
    exported_names = {root.name}

    def walk(obj: bpy.types.Object):
        for child in obj.children:
            yield child
            yield from walk(child)

    for child in walk(root):
        exported_names.add(child.name)

    missing = [name for name in CONTRACT_GROUPS if name not in exported_names]
    if missing:
        raise RuntimeError(f"Missing required animation groups: {', '.join(missing)}")


def make_poster_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="NaviSense vest">
  <defs>
    <linearGradient id="body" x1="220" x2="420" y1="80" y2="560" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#3a444f"/>
      <stop offset=".5" stop-color="#202832"/>
      <stop offset="1" stop-color="#11171e"/>
    </linearGradient>
    <filter id="shadow" x="-25%" y="-20%" width="150%" height="155%">
      <feDropShadow dx="0" dy="26" stdDeviation="24" flood-color="#020326" flood-opacity=".42"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <path d="M174 535c-25-88-23-258 0-353 15-62 54-98 102-118 21 29 35 70 44 118 9-48 23-89 44-118 48 20 87 56 102 118 23 95 25 265 0 353-75 35-217 35-292 0Z" fill="url(#body)" stroke="#4d5966" stroke-width="10" stroke-linejoin="round"/>
    <path d="M270 72c-35 49-55 112-62 184M370 72c35 49 55 112 62 184" fill="none" stroke="#0c1218" stroke-width="34" stroke-linecap="round"/>
    <path d="M198 220c-18 84-17 196 4 280M442 220c18 84 17 196-4 280" fill="none" stroke="#485461" stroke-width="13" stroke-linecap="round"/>
    <path d="M320 198v318" stroke="#0d131a" stroke-width="25" stroke-linecap="round"/>
    <path d="M335 218v260" stroke="#5fa9e8" stroke-width="7" stroke-linecap="round"/>
    <path d="M204 292h232M196 365h248M207 438h226" stroke="#0b1118" stroke-width="23" stroke-linecap="round"/>
    <path d="M204 292h232M196 365h248M207 438h226" stroke="#48535f" stroke-width="7" stroke-linecap="round"/>
    <rect x="456" y="260" width="78" height="126" rx="18" fill="#151c24" stroke="#5fa9e8" stroke-opacity=".34" stroke-width="6"/>
  </g>
</svg>
"""


def main() -> None:
    ensure_dirs()
    clear_scene()

    mats = create_materials()
    root = make_empty("navisense_vest")
    build_vest_body(root, mats)
    build_hardware(root, mats)
    add_lighting()

    root.rotation_euler = blender_rotation((0.08, 0, -0.0))
    root.scale = (1.0, 1.0, 1.0)

    # Keep origin and scale predictable for the website animation.
    bpy.context.scene.render.engine = "CYCLES"
    bpy.context.scene.unit_settings.system = "METRIC"

    validate_contract(root)
    export_assets()
    print(f"Exported {PUBLIC_MODELS / 'navisense-vest.glb'}")
    print(f"Exported {PUBLIC_MODELS / 'navisense-vest-poster.svg'}")


if __name__ == "__main__":
    main()
