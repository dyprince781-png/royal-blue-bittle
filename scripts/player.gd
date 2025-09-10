extends KinematicBody2D

const GRAVITY = 1200
const JUMP_FORCE = -450
const SPEED = 250
var velocity = Vector2()
var lane_x = [-120, 0, 120]  # 3 lanes
var current_lane = 1

func _physics_process(delta):
    # Auto-run forward
    position.y += -SPEED * delta   # moves upward as "forward"

    # Lane switch keys (left/right)
    if Input.is_action_just_pressed("ui_left"):
        change_lane(-1)
    if Input.is_action_just_pressed("ui_right"):
        change_lane(1)

    # Jump
    if Input.is_action_just_pressed("ui_up") and is_on_floor():
        velocity.y = JUMP_FORCE

    velocity.y += GRAVITY * delta
    move_and_slide(velocity, Vector2.UP)

    # Smooth move to target lane
    var target_x = lane_x[current_lane]
    position.x = lerp(position.x, target_x, 0.2)

func change_lane(dir):
    current_lane = clamp(current_lane + dir, 0, 2)
