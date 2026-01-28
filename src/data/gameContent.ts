export const storyContent = {
  premise: `In the year 2157, humanity's last survivors live in an underground megacity called "Haven." 
Above ground, a catastrophic event known as "The Fracture" has transformed the surface into an 
ever-shifting labyrinth of concrete and steel—a prison designed by an ancient AI that went rogue 
during the final war.`,
  
  protagonist: {
    name: "Kira Vance",
    age: 28,
    background: `A former Haven security officer who volunteered for the most dangerous mission in 
human history: navigate the Labyrinth to reach the AI's core and shut it down. She carries the 
weight of personal loss—her younger brother was one of the first "Runners" sent into the maze, 
never to return.`,
    traits: ["Resourceful", "Determined", "Haunted by guilt", "Natural leader"],
  },
  
  factions: [
    {
      name: "The Runners",
      description: "Survivors trapped in the maze who have formed small communities in safe zones.",
    },
    {
      name: "The Marked",
      description: "Former humans corrupted by the Labyrinth's influence, serving as the AI's enforcers.",
    },
    {
      name: "The Architects",
      description: "A mysterious group claiming to understand the maze's patterns and offering guidance—for a price.",
    },
  ],
};

export const enemies = [
  {
    name: "The Stalker",
    threat: "High" as const,
    description: "A towering humanoid figure wrapped in shadows, attracted to sound and movement. It cannot be killed, only evaded.",
    behavior: [
      "Patrols predetermined paths but investigates disturbances",
      "Moves slowly but teleports to cut off escape routes",
      "Creates audio distortions when nearby",
      "Vision range increases in well-lit areas",
    ],
    weaknesses: [
      "Blinded by complete darkness",
      "Can be distracted with thrown objects",
      "Cannot enter designated safe zones",
      "Loses track of stationary targets after 30 seconds",
    ],
  },
  {
    name: "Shrieker",
    threat: "Medium" as const,
    description: "Small, spider-like creatures that travel in packs. They alert other enemies with their piercing screams when they spot prey.",
    behavior: [
      "Hunt in groups of 3-5",
      "Rapid movement through vents and narrow passages",
      "Emit warning screech before attacking",
      "Attracted to light sources",
    ],
    weaknesses: [
      "Vulnerable to melee attacks",
      "Flee from fire or bright flashes",
      "Cannot swim or cross water",
      "Territorial—won't leave their designated areas",
    ],
  },
  {
    name: "The Warden",
    threat: "Extreme" as const,
    description: "The Labyrinth's ultimate enforcer. A massive mechanical-organic hybrid that only appears when the player has triggered too many alarms.",
    behavior: [
      "Summoned after 3+ alarm triggers in a sector",
      "Destroys walls to reach its target",
      "Immune to all conventional damage",
      "Hunts until the player escapes the current sector",
    ],
    weaknesses: [
      "Can only be escaped, not defeated",
      "Predictable charge attack patterns",
      "Cannot fit through standard doorways",
      "Sector transition resets its aggro",
    ],
  },
  {
    name: "Echo",
    threat: "Low" as const,
    description: "Ghostly apparitions of previous Runners. They wander aimlessly but will follow players, sometimes leading to danger, sometimes to safety.",
    behavior: [
      "Mimics player movements with delay",
      "Can phase through walls",
      "Sometimes points toward hidden items",
      "May accidentally reveal player position to enemies",
    ],
    weaknesses: [
      "Non-hostile—poses indirect threat only",
      "Disperses when looked at directly",
      "Cannot enter safe rooms",
      "Avoids areas with high enemy activity",
    ],
  },
];

export const progressionSystem = {
  levels: [
    {
      name: "Outer Rim",
      difficulty: "Tutorial",
      description: "The maze's exterior—relatively stable with fewer enemies and more resources.",
      objectives: ["Learn basic mechanics", "Establish first safe house", "Find first Echo memory"],
    },
    {
      name: "The Corridors",
      difficulty: "Easy",
      description: "Endless hallways that shift every few hours. Time management becomes crucial.",
      objectives: ["Survive first maze shift", "Encounter The Stalker", "Join a Runner community"],
    },
    {
      name: "The Gardens",
      difficulty: "Medium",
      description: "An overgrown sector where nature has reclaimed the structures. Visibility is low.",
      objectives: ["Navigate without light", "Solve environmental puzzles", "Face Shrieker nests"],
    },
    {
      name: "The Factory",
      difficulty: "Hard",
      description: "Industrial ruins filled with machinery, traps, and the corrupted Marked.",
      objectives: ["Disable security systems", "Craft advanced equipment", "Survive The Warden"],
    },
    {
      name: "The Core",
      difficulty: "Extreme",
      description: "The heart of the Labyrinth where reality itself begins to break down.",
      objectives: ["Reach the AI core", "Confront the truth", "Make the final choice"],
    },
  ],
  
  skills: [
    { name: "Silent Step", description: "Reduce noise while moving" },
    { name: "Eagle Eye", description: "Mark enemies and items through walls" },
    { name: "Endurance", description: "Increase maximum stamina" },
    { name: "Quick Hands", description: "Faster interaction speed" },
    { name: "Resistance", description: "Survive one fatal hit" },
    { name: "Scavenger", description: "Find more resources in containers" },
  ],
};

export const mazeGeneratorCode = `using UnityEngine;
using System.Collections.Generic;

public class MazeGenerator : MonoBehaviour
{
    [Header("Maze Settings")]
    public int width = 20;
    public int height = 20;
    public float cellSize = 4f;
    
    [Header("Prefabs")]
    public GameObject wallPrefab;
    public GameObject floorPrefab;
    public GameObject ceilingPrefab;
    
    private int[,] maze;
    private List<Vector2Int> frontier = new List<Vector2Int>();
    
    void Start()
    {
        GenerateMaze();
        BuildMaze();
    }
    
    void GenerateMaze()
    {
        // Initialize maze with all walls (1 = wall, 0 = path)
        maze = new int[width, height];
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                maze[x, y] = 1;
            }
        }
        
        // Randomized Prim's Algorithm
        int startX = Random.Range(1, width - 1);
        int startY = Random.Range(1, height - 1);
        
        // Make start an odd coordinate for proper maze generation
        startX = startX % 2 == 0 ? startX + 1 : startX;
        startY = startY % 2 == 0 ? startY + 1 : startY;
        
        maze[startX, startY] = 0;
        AddFrontier(startX, startY);
        
        while (frontier.Count > 0)
        {
            // Pick random frontier cell
            int index = Random.Range(0, frontier.Count);
            Vector2Int cell = frontier[index];
            frontier.RemoveAt(index);
            
            // Find neighbors that are already paths
            List<Vector2Int> neighbors = GetPathNeighbors(cell.x, cell.y);
            
            if (neighbors.Count > 0)
            {
                // Connect to random path neighbor
                Vector2Int neighbor = neighbors[Random.Range(0, neighbors.Count)];
                
                // Carve path
                maze[cell.x, cell.y] = 0;
                maze[(cell.x + neighbor.x) / 2, (cell.y + neighbor.y) / 2] = 0;
                
                AddFrontier(cell.x, cell.y);
            }
        }
    }
    
    void AddFrontier(int x, int y)
    {
        // Add unvisited cells 2 steps away
        int[,] directions = { { 0, 2 }, { 0, -2 }, { 2, 0 }, { -2, 0 } };
        
        for (int i = 0; i < 4; i++)
        {
            int nx = x + directions[i, 0];
            int ny = y + directions[i, 1];
            
            if (IsInBounds(nx, ny) && maze[nx, ny] == 1)
            {
                Vector2Int frontierCell = new Vector2Int(nx, ny);
                if (!frontier.Contains(frontierCell))
                {
                    frontier.Add(frontierCell);
                }
            }
        }
    }
    
    List<Vector2Int> GetPathNeighbors(int x, int y)
    {
        List<Vector2Int> neighbors = new List<Vector2Int>();
        int[,] directions = { { 0, 2 }, { 0, -2 }, { 2, 0 }, { -2, 0 } };
        
        for (int i = 0; i < 4; i++)
        {
            int nx = x + directions[i, 0];
            int ny = y + directions[i, 1];
            
            if (IsInBounds(nx, ny) && maze[nx, ny] == 0)
            {
                neighbors.Add(new Vector2Int(nx, ny));
            }
        }
        
        return neighbors;
    }
    
    bool IsInBounds(int x, int y)
    {
        return x > 0 && x < width - 1 && y > 0 && y < height - 1;
    }
    
    void BuildMaze()
    {
        Transform mazeParent = new GameObject("Maze").transform;
        
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Vector3 position = new Vector3(x * cellSize, 0, y * cellSize);
                
                // Always place floor
                Instantiate(floorPrefab, position, Quaternion.identity, mazeParent);
                
                if (maze[x, y] == 1)
                {
                    // Place wall
                    Instantiate(wallPrefab, position + Vector3.up * (cellSize / 2), 
                               Quaternion.identity, mazeParent);
                }
                else
                {
                    // Place ceiling for paths
                    Instantiate(ceilingPrefab, position + Vector3.up * cellSize, 
                               Quaternion.identity, mazeParent);
                }
            }
        }
    }
    
    // Call this to regenerate the maze at runtime
    public void RegenerateMaze()
    {
        // Destroy existing maze
        GameObject existingMaze = GameObject.Find("Maze");
        if (existingMaze != null)
        {
            Destroy(existingMaze);
        }
        
        GenerateMaze();
        BuildMaze();
    }
}`;

export const playerControllerCode = `using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class FirstPersonController : MonoBehaviour
{
    [Header("Movement")]
    public float walkSpeed = 4f;
    public float runSpeed = 8f;
    public float crouchSpeed = 2f;
    public float jumpForce = 5f;
    public float gravity = -20f;
    
    [Header("Mouse Look")]
    public float mouseSensitivity = 2f;
    public float maxLookAngle = 85f;
    public Transform cameraTransform;
    
    [Header("Stamina")]
    public float maxStamina = 100f;
    public float staminaDrainRate = 20f;
    public float staminaRegenRate = 15f;
    public float staminaRegenDelay = 1f;
    
    [Header("Crouch")]
    public float standingHeight = 2f;
    public float crouchHeight = 1f;
    public float crouchTransitionSpeed = 8f;
    
    // Components
    private CharacterController controller;
    
    // Movement state
    private Vector3 velocity;
    private float currentSpeed;
    private bool isGrounded;
    private bool isCrouching;
    
    // Stamina
    private float currentStamina;
    private float staminaRegenTimer;
    private bool isExhausted;
    
    // Mouse look
    private float xRotation = 0f;
    
    // Audio
    private float footstepTimer;
    public float walkFootstepInterval = 0.5f;
    public float runFootstepInterval = 0.3f;
    
    void Start()
    {
        controller = GetComponent<CharacterController>();
        currentStamina = maxStamina;
        
        // Lock cursor
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
        
        if (cameraTransform == null)
        {
            cameraTransform = Camera.main.transform;
        }
    }
    
    void Update()
    {
        HandleMouseLook();
        HandleMovement();
        HandleStamina();
        HandleCrouch();
        HandleFootsteps();
    }
    
    void HandleMouseLook()
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;
        
        // Vertical rotation (camera only)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -maxLookAngle, maxLookAngle);
        cameraTransform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        
        // Horizontal rotation (whole body)
        transform.Rotate(Vector3.up * mouseX);
    }
    
    void HandleMovement()
    {
        isGrounded = controller.isGrounded;
        
        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f; // Small downward force to keep grounded
        }
        
        // Get input
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        Vector3 moveDirection = transform.right * horizontal + transform.forward * vertical;
        
        // Determine speed
        bool wantsToRun = Input.GetKey(KeyCode.LeftShift) && !isExhausted && !isCrouching;
        bool isMoving = moveDirection.magnitude > 0.1f;
        
        if (isCrouching)
        {
            currentSpeed = crouchSpeed;
        }
        else if (wantsToRun && isMoving)
        {
            currentSpeed = runSpeed;
        }
        else
        {
            currentSpeed = walkSpeed;
        }
        
        // Apply movement
        controller.Move(moveDirection.normalized * currentSpeed * Time.deltaTime);
        
        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded && !isCrouching)
        {
            velocity.y = Mathf.Sqrt(jumpForce * -2f * gravity);
        }
        
        // Apply gravity
        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
        
        // Drain stamina while running
        if (wantsToRun && isMoving)
        {
            DrainStamina(staminaDrainRate * Time.deltaTime);
        }
    }
    
    void HandleStamina()
    {
        // Regenerate stamina when not running
        bool isRunning = Input.GetKey(KeyCode.LeftShift) && currentSpeed == runSpeed;
        
        if (!isRunning)
        {
            staminaRegenTimer += Time.deltaTime;
            
            if (staminaRegenTimer >= staminaRegenDelay)
            {
                currentStamina += staminaRegenRate * Time.deltaTime;
                currentStamina = Mathf.Clamp(currentStamina, 0, maxStamina);
                
                // Recover from exhaustion when stamina reaches 30%
                if (isExhausted && currentStamina > maxStamina * 0.3f)
                {
                    isExhausted = false;
                }
            }
        }
    }
    
    void DrainStamina(float amount)
    {
        currentStamina -= amount;
        staminaRegenTimer = 0f;
        
        if (currentStamina <= 0)
        {
            currentStamina = 0;
            isExhausted = true;
        }
    }
    
    void HandleCrouch()
    {
        if (Input.GetKeyDown(KeyCode.LeftControl) || Input.GetKeyDown(KeyCode.C))
        {
            isCrouching = !isCrouching;
        }
        
        float targetHeight = isCrouching ? crouchHeight : standingHeight;
        float currentHeight = controller.height;
        
        if (Mathf.Abs(currentHeight - targetHeight) > 0.01f)
        {
            controller.height = Mathf.Lerp(currentHeight, targetHeight, 
                                           crouchTransitionSpeed * Time.deltaTime);
            
            // Adjust camera height
            Vector3 camPos = cameraTransform.localPosition;
            camPos.y = controller.height - 0.2f;
            cameraTransform.localPosition = camPos;
        }
    }
    
    void HandleFootsteps()
    {
        if (!isGrounded || velocity.magnitude < 0.1f) return;
        
        float interval = currentSpeed == runSpeed ? runFootstepInterval : walkFootstepInterval;
        footstepTimer += Time.deltaTime;
        
        if (footstepTimer >= interval)
        {
            footstepTimer = 0f;
            PlayFootstep();
        }
    }
    
    void PlayFootstep()
    {
        // This creates noise that enemies can detect
        // Implement your audio system here
        float noiseRadius = currentSpeed == runSpeed ? 15f : 5f;
        
        // Broadcast footstep event for enemy AI
        GameEvents.OnPlayerFootstep?.Invoke(transform.position, noiseRadius);
    }
    
    // Public getters for UI
    public float GetStaminaPercent() => currentStamina / maxStamina;
    public bool IsExhausted() => isExhausted;
    public bool IsCrouching() => isCrouching;
    public bool IsRunning() => currentSpeed == runSpeed;
}

// Event system for communication
public static class GameEvents
{
    public static System.Action<Vector3, float> OnPlayerFootstep;
}`;

export const enemyAICode = `using UnityEngine;
using UnityEngine.AI;
using System.Collections;

public class EnemyAI : MonoBehaviour
{
    public enum EnemyState { Idle, Patrol, Investigate, Chase, Search }
    
    [Header("Detection")]
    public float sightRange = 20f;
    public float sightAngle = 110f;
    public float hearingRange = 15f;
    public LayerMask playerLayer;
    public LayerMask obstructionLayer;
    
    [Header("Movement")]
    public float patrolSpeed = 2f;
    public float chaseSpeed = 5f;
    public float investigateSpeed = 3f;
    
    [Header("Behavior")]
    public float investigateTime = 5f;
    public float searchTime = 10f;
    public float patrolWaitTime = 2f;
    
    [Header("Patrol")]
    public float patrolRadius = 20f;
    public int patrolPointCount = 5;
    
    // Components
    private NavMeshAgent agent;
    private Transform player;
    private Animator animator;
    
    // State
    private EnemyState currentState = EnemyState.Patrol;
    private Vector3 lastKnownPlayerPos;
    private Vector3[] patrolPoints;
    private int currentPatrolIndex;
    private float stateTimer;
    private bool playerInSight;
    
    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();
        player = GameObject.FindGameObjectWithTag("Player")?.transform;
        
        GeneratePatrolPoints();
        
        // Subscribe to player footstep events
        GameEvents.OnPlayerFootstep += OnHearSound;
    }
    
    void OnDestroy()
    {
        GameEvents.OnPlayerFootstep -= OnHearSound;
    }
    
    void Update()
    {
        CheckPlayerVisibility();
        
        switch (currentState)
        {
            case EnemyState.Idle:
                HandleIdle();
                break;
            case EnemyState.Patrol:
                HandlePatrol();
                break;
            case EnemyState.Investigate:
                HandleInvestigate();
                break;
            case EnemyState.Chase:
                HandleChase();
                break;
            case EnemyState.Search:
                HandleSearch();
                break;
        }
        
        UpdateAnimations();
    }
    
    void GeneratePatrolPoints()
    {
        patrolPoints = new Vector3[patrolPointCount];
        
        for (int i = 0; i < patrolPointCount; i++)
        {
            Vector3 randomPoint = transform.position + 
                Random.insideUnitSphere * patrolRadius;
            
            NavMeshHit hit;
            if (NavMesh.SamplePosition(randomPoint, out hit, patrolRadius, NavMesh.AllAreas))
            {
                patrolPoints[i] = hit.position;
            }
            else
            {
                patrolPoints[i] = transform.position;
            }
        }
    }
    
    void CheckPlayerVisibility()
    {
        if (player == null) return;
        
        playerInSight = false;
        Vector3 directionToPlayer = player.position - transform.position;
        float distanceToPlayer = directionToPlayer.magnitude;
        
        // Check distance
        if (distanceToPlayer > sightRange) return;
        
        // Check angle
        float angle = Vector3.Angle(transform.forward, directionToPlayer);
        if (angle > sightAngle / 2f) return;
        
        // Check line of sight
        if (!Physics.Raycast(transform.position + Vector3.up, 
                            directionToPlayer.normalized, 
                            distanceToPlayer, 
                            obstructionLayer))
        {
            playerInSight = true;
            lastKnownPlayerPos = player.position;
            
            if (currentState != EnemyState.Chase)
            {
                TransitionToState(EnemyState.Chase);
            }
        }
    }
    
    void OnHearSound(Vector3 soundPosition, float soundRadius)
    {
        float distance = Vector3.Distance(transform.position, soundPosition);
        
        if (distance <= hearingRange && distance <= soundRadius)
        {
            // Heard the player
            if (currentState == EnemyState.Patrol || currentState == EnemyState.Idle)
            {
                lastKnownPlayerPos = soundPosition;
                TransitionToState(EnemyState.Investigate);
            }
        }
    }
    
    void HandleIdle()
    {
        stateTimer -= Time.deltaTime;
        
        if (stateTimer <= 0)
        {
            TransitionToState(EnemyState.Patrol);
        }
    }
    
    void HandlePatrol()
    {
        agent.speed = patrolSpeed;
        
        if (!agent.hasPath || agent.remainingDistance < 0.5f)
        {
            // Reached patrol point, wait then move to next
            TransitionToState(EnemyState.Idle);
            stateTimer = patrolWaitTime;
            
            currentPatrolIndex = (currentPatrolIndex + 1) % patrolPoints.Length;
            return;
        }
    }
    
    void HandleInvestigate()
    {
        agent.speed = investigateSpeed;
        
        if (!agent.hasPath || agent.remainingDistance < 1f)
        {
            // Reached investigation point
            stateTimer -= Time.deltaTime;
            
            // Look around
            transform.Rotate(0, 90 * Time.deltaTime, 0);
            
            if (stateTimer <= 0)
            {
                TransitionToState(EnemyState.Patrol);
            }
        }
    }
    
    void HandleChase()
    {
        agent.speed = chaseSpeed;
        
        if (playerInSight)
        {
            agent.SetDestination(player.position);
        }
        else
        {
            // Lost sight, go to last known position
            TransitionToState(EnemyState.Search);
        }
        
        // Check if caught player
        if (Vector3.Distance(transform.position, player.position) < 1.5f)
        {
            CatchPlayer();
        }
    }
    
    void HandleSearch()
    {
        agent.speed = investigateSpeed;
        stateTimer -= Time.deltaTime;
        
        if (!agent.hasPath || agent.remainingDistance < 1f)
        {
            // Search random nearby positions
            Vector3 searchPoint = lastKnownPlayerPos + 
                Random.insideUnitSphere * 10f;
            searchPoint.y = transform.position.y;
            
            NavMeshHit hit;
            if (NavMesh.SamplePosition(searchPoint, out hit, 10f, NavMesh.AllAreas))
            {
                agent.SetDestination(hit.position);
            }
        }
        
        if (stateTimer <= 0)
        {
            TransitionToState(EnemyState.Patrol);
        }
    }
    
    void TransitionToState(EnemyState newState)
    {
        currentState = newState;
        
        switch (newState)
        {
            case EnemyState.Patrol:
                agent.SetDestination(patrolPoints[currentPatrolIndex]);
                break;
            case EnemyState.Investigate:
                stateTimer = investigateTime;
                agent.SetDestination(lastKnownPlayerPos);
                break;
            case EnemyState.Search:
                stateTimer = searchTime;
                agent.SetDestination(lastKnownPlayerPos);
                break;
            case EnemyState.Chase:
                // Alert nearby enemies
                AlertNearbyEnemies();
                break;
        }
    }
    
    void AlertNearbyEnemies()
    {
        Collider[] nearbyEnemies = Physics.OverlapSphere(transform.position, 20f);
        
        foreach (Collider col in nearbyEnemies)
        {
            EnemyAI otherEnemy = col.GetComponent<EnemyAI>();
            if (otherEnemy != null && otherEnemy != this)
            {
                otherEnemy.OnAlertedByAlly(lastKnownPlayerPos);
            }
        }
    }
    
    public void OnAlertedByAlly(Vector3 playerPosition)
    {
        if (currentState != EnemyState.Chase)
        {
            lastKnownPlayerPos = playerPosition;
            TransitionToState(EnemyState.Investigate);
        }
    }
    
    void CatchPlayer()
    {
        // Implement game over or damage logic
        Debug.Log("Player Caught!");
    }
    
    void UpdateAnimations()
    {
        if (animator == null) return;
        
        animator.SetFloat("Speed", agent.velocity.magnitude);
        animator.SetBool("IsChasing", currentState == EnemyState.Chase);
    }
    
    // Debug visualization
    void OnDrawGizmosSelected()
    {
        // Sight range
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, sightRange);
        
        // Sight cone
        Vector3 leftBound = Quaternion.Euler(0, -sightAngle / 2, 0) * transform.forward;
        Vector3 rightBound = Quaternion.Euler(0, sightAngle / 2, 0) * transform.forward;
        Gizmos.color = Color.red;
        Gizmos.DrawRay(transform.position, leftBound * sightRange);
        Gizmos.DrawRay(transform.position, rightBound * sightRange);
        
        // Hearing range
        Gizmos.color = Color.blue;
        Gizmos.DrawWireSphere(transform.position, hearingRange);
        
        // Patrol points
        if (patrolPoints != null)
        {
            Gizmos.color = Color.green;
            foreach (Vector3 point in patrolPoints)
            {
                Gizmos.DrawSphere(point, 0.5f);
            }
        }
    }
}`;

export const atmosphereDesign = {
  lighting: {
    title: "Lighting System",
    description: "A dynamic lighting system that creates tension and guides player behavior.",
    elements: [
      {
        name: "Ambient Darkness",
        details: "Base ambient light at 5-10% intensity. The maze should feel oppressively dark.",
      },
      {
        name: "Emergency Lights",
        details: "Dim red emergency lights provide minimal visibility, flickering randomly to increase tension.",
      },
      {
        name: "Player Flashlight",
        details: "Limited battery life, creates a cone of harsh white light. Attracts certain enemies.",
      },
      {
        name: "Bioluminescent Growth",
        details: "Organic teal/green lights that pulse slowly. Safe zones are marked by stronger glow.",
      },
      {
        name: "Dynamic Shadows",
        details: "Real-time shadows that react to all light sources, creating movement in peripheral vision.",
      },
    ],
  },
  
  fog: {
    title: "Fog & Atmosphere",
    description: "Volumetric fog creates depth and limits visibility.",
    elements: [
      {
        name: "Ground Fog",
        details: "Low-lying fog that obscures the floor, hiding Shriekers and environmental hazards.",
      },
      {
        name: "Sector Fog",
        details: "Each sector has different fog density. The Core has the thickest, almost impenetrable fog.",
      },
      {
        name: "Dynamic Density",
        details: "Fog thickens when The Warden is active, creating 'red alert' scenarios.",
      },
    ],
  },
  
  audio: {
    title: "Sound Design",
    description: "Audio is crucial for both atmosphere and gameplay mechanics.",
    elements: [
      {
        name: "Ambient Soundscape",
        details: "Distant metallic groans, dripping water, electrical hums, and unexplained whispers.",
      },
      {
        name: "Proximity Audio",
        details: "Players can hear enemies before seeing them. Different enemies have unique audio signatures.",
      },
      {
        name: "Heartbeat System",
        details: "Player's heartbeat becomes audible and increases when stamina is low or enemies are near.",
      },
      {
        name: "Echo Memory",
        details: "Ghostly recordings of previous Runners play from speakers, delivering lore and warnings.",
      },
      {
        name: "The Silence",
        details: "Complete audio cut before major encounters. The absence of sound is terrifying.",
      },
    ],
  },
  
  tension: {
    title: "Tension Mechanics",
    description: "Systems designed to maintain psychological pressure on players.",
    elements: [
      {
        name: "Sanity System",
        details: "Extended time in darkness or near enemies causes visual distortions and false enemy sightings.",
      },
      {
        name: "Clock Pressure",
        details: "Maze sectors shift every 30 real-world minutes. Players must reach safe zones or risk being crushed.",
      },
      {
        name: "Resource Scarcity",
        details: "Flashlight batteries, medical supplies, and food are extremely limited.",
      },
      {
        name: "No Pause",
        details: "The game never truly pauses. Opening menus only dims the screen—time continues.",
      },
      {
        name: "Permadeath Lite",
        details: "Death sends players back to the last safe room with reduced resources.",
      },
    ],
  },
};
