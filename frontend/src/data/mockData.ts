export interface Satellite {
  id: string;
  name: string;
  status: 'Active' | 'Warning' | 'Inactive';
  altitude: number;
  velocity: number;
  inclination: number;
  lastContact: string;
}

export interface Debris {
  id: string;
  size: number;
  velocity: number;
  distance: number;
  timeToImpact: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'warning';
  satellite: string;
  message: string;
  detail: string;
}

export const satellites: Satellite[] = [
  { id: 'SAT-01', name: 'SAT-01', status: 'Active', altitude: 720, velocity: 7.6, inclination: 97.4, lastContact: '14:22 UTC' },
  { id: 'SAT-02', name: 'SAT-02', status: 'Warning', altitude: 780, velocity: 7.5, inclination: 98.7, lastContact: '12:45 UTC' },
  { id: 'SAT-03', name: 'SAT-03', status: 'Active', altitude: 550, velocity: 7.6, inclination: 51.6, lastContact: '13:10 UTC' },
  { id: 'SAT-04', name: 'SAT-04', status: 'Warning', altitude: 680, velocity: 7.5, inclination: 87.3, lastContact: '11:58 UTC' },
  { id: 'SAT-05', name: 'SAT-05', status: 'Active', altitude: 820, velocity: 7.4, inclination: 99.1, lastContact: '10:30 UTC' },
];

export const debrisList: Debris[] = [
  { id: 'DEB-112', size: 1.2, velocity: 9.3, distance: 320, timeToImpact: '2 hrs' },
  { id: 'DEB-087', size: 0.5, velocity: 12.1, distance: 750, timeToImpact: '4 hrs' },
  { id: 'DEB-234', size: 2.1, velocity: 8.7, distance: 480, timeToImpact: '1.5 hrs' },
  { id: 'DEB-056', size: 0.3, velocity: 11.2, distance: 1200, timeToImpact: '6 hrs' },
];

export const notifications: Notification[] = [
  { id: '1', type: 'alert', satellite: 'SAT-02', message: 'Close Approach with Debris', detail: 'Distance: 320 meters • Time to Impact: 2 hrs' },
  { id: '2', type: 'warning', satellite: 'SAT-04', message: 'Potential Collision Detected', detail: 'Distance: 750 meters' },
  { id: '3', type: 'alert', satellite: 'SAT-05', message: 'Debris in Proximity', detail: 'Distance: 480 meters' },
];

export const orbitConfigs = [
  { radius: 3.0, tilt: 0.3, speed: 0.3, color: '#0ea5e9' },
  { radius: 3.2, tilt: 0.8, speed: 0.25, color: '#f59e0b' },
  { radius: 3.5, tilt: -0.4, speed: 0.35, color: '#22c55e' },
  { radius: 2.8, tilt: 1.2, speed: 0.28, color: '#ef4444' },
  { radius: 3.3, tilt: -0.6, speed: 0.32, color: '#a855f7' },
];
