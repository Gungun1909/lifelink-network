export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

export function filterByDistance(
  items: any[],
  userLat: number,
  userLon: number,
  maxDistance: number
): any[] {
  return items.filter((item) => {
    const distance = calculateDistance(
      userLat,
      userLon,
      item.latitude,
      item.longitude
    );
    return distance <= maxDistance;
  });
}

export function sortByDistance(
  items: any[],
  userLat: number,
  userLon: number,
  order: 'asc' | 'desc' = 'asc'
): any[] {
  const itemsWithDistance = items.map((item) => ({
    ...item,
    distance: calculateDistance(
      userLat,
      userLon,
      item.latitude,
      item.longitude
    ),
  }));

  return itemsWithDistance.sort((a, b) => {
    return order === 'asc' ? a.distance - b.distance : b.distance - a.distance;
  });
}

export function getNearbyItems(
  items: any[],
  userLat: number,
  userLon: number,
  limit: number = 5
): any[] {
  return sortByDistance(items, userLat, userLon, 'asc').slice(0, limit);
}
