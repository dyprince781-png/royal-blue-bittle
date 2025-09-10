using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float laneDistance = 2f;     // Distance between lanes
    public float jumpForce = 7f;        // Jump height
    public float forwardSpeed = 6f;     // Forward speed
    private int currentLane = 1;        // 0 = left, 1 = middle, 2 = right
    private CharacterController controller;
    private Vector3 moveVector;
    private float verticalVelocity;

    void Start()
    {
        controller = GetComponent<CharacterController>();
    }

    void Update()
    {
        // Auto-run forward
        moveVector.z = forwardSpeed;

        // Lane movement
        float targetX = (currentLane - 1) * laneDistance;
        moveVector.x = (targetX - transform.position.x) * 10f;

        // Jump (space for PC test)
        if (controller.isGrounded)
        {
            verticalVelocity = -0.1f;
            if (Input.GetKeyDown(KeyCode.Space))
                verticalVelocity = jumpForce;
        }
        else
        {
            verticalVelocity += Physics.gravity.y * Time.deltaTime;
        }
        moveVector.y = verticalVelocity;

        // Move the player
        controller.Move(moveVector * Time.deltaTime);

        // Left/Right keys for testing
        if (Input.GetKeyDown(KeyCode.A)) ChangeLane(-1);
        if (Input.GetKeyDown(KeyCode.D)) ChangeLane(1);
    }

    public void ChangeLane(int direction)
    {
        currentLane = Mathf.Clamp(currentLane + direction, 0, 2);
    }
}
