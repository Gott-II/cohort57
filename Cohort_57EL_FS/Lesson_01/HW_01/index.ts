// Definition des Interface Robot
interface Robot {
  model: string;
}

// Definition des Interface Astronaut
interface Astronaut {
  isInSpace: boolean;
  experienceYears: number;
  assistantRobot: Robot;
  missions: string[];
}

// Beispielhafte Instanzen

const robot1: Robot = {
  model: "BOLBES-12",
};

const astronaut1: Astronaut = {
  isInSpace: true,
  experienceYears: 12,
  assistantRobot: robot1,
  missions: ["Moon Landing", "ISS Maintenance"],
};

const astronaut2: Astronaut = {
  isInSpace: false,
  experienceYears: 5,
  assistantRobot: { model: "Zeta-9" },
  missions: ["Satellite Deployment"],
};
