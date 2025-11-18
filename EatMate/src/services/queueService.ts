const KEY = "queue_by_branch";

const loadQueue = (): any => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : {};
};

const saveQueue = (data: any) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const addQueue = (
  restaurantId: string, 
  branchId: string, 
  partyId: string
) => {
  const queue = loadQueue();

 
  if (!queue[restaurantId]) {
    queue[restaurantId] = {};
  }


  if (!queue[restaurantId][branchId]) {
    queue[restaurantId][branchId] = [];
  }

  const branchQueue = queue[restaurantId][branchId];

  const newQueueId =
    branchQueue.length === 0
      ? "A01"
      : "A" + String(branchQueue.length + 1).padStart(2, "0");

  const newQueue = {
    queueId: newQueueId,
    partyId,
    status: "waiting",
  };

  branchQueue.push(newQueue);
  saveQueue(queue);

  return newQueue;
};
