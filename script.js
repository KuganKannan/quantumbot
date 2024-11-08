// Get the badge container
const badgeContainer = document.getElementById("badge-container");

// Object to store earned badges and avoid duplicates
const earnedBadges = {};

// Time thresholds for awarding badges (in seconds)
const thresholds = {
  "curious-learner": 600, // 10 minutes
  "coding-expert": 1200, // 20 minutes
};

// Function to check and award badges based on time spent
function checkTimeBadges() {
  const timeSpent = parseInt(localStorage.getItem("timeSpent")) || 0;

  // Check for each time-based badge and award if conditions are met
  if (
    timeSpent >= thresholds["curious-learner"] &&
    !earnedBadges["curious-learner"]
  ) {
    awardBadge("curious-learner");
  }
  if (
    timeSpent >= thresholds["coding-expert"] &&
    !earnedBadges["coding-expert"]
  ) {
    awardBadge("coding-expert");
  }

  // Continue checking every second to catch when thresholds are reached
  setInterval(() => {
    const updatedTimeSpent = parseInt(localStorage.getItem("timeSpent")) || 0;

    if (
      updatedTimeSpent >= thresholds["curious-learner"] &&
      !earnedBadges["curious-learner"]
    ) {
      awardBadge("curious-learner");
    }
    if (
      updatedTimeSpent >= thresholds["coding-expert"] &&
      !earnedBadges["coding-expert"]
    ) {
      awardBadge("coding-expert");
    }
  }, 1000);
}

// Call checkTimeBadges when the badge page loads
checkTimeBadges();

// Function to award a badge based on type
function awardBadge(badgeType) {
  if (earnedBadges[badgeType]) {
    alert("You already earned the " + badgeType.replace("-", " ") + " badge!");
    return;
  }

  let badgeText;
  let badgeClass;

  // Define badge text and style based on badge type
  switch (badgeType) {
    case "curious-learner":
      badgeText = "Curious Learner";
      badgeClass = "badge curious-learner";
      break;
    case "frequent-user":
      badgeText = "Frequent User";
      badgeClass = "badge frequent-user";
      break;
    case "coding-expert":
      badgeText = "Coding Expert";
      badgeClass = "badge coding-expert";
      break;
    case "dedicated-user":
      badgeText = "Dedicated User";
      badgeClass = "badge dedicated-user";
      break;
    default:
      alert("Unknown badge type.");
      return;
  }

  // Create a badge element
  const badge = document.createElement("div");
  badge.className = badgeClass;

  // Create an icon for the badge
  const icon = document.createElement("span");
  icon.className = "badge-icon";
  badge.appendChild(icon);

  // Add badge text
  const badgeTextNode = document.createTextNode(badgeText);
  badge.appendChild(badgeTextNode);

  // Add the badge to the badge container
  badgeContainer.appendChild(badge);

  // Mark the badge as earned to avoid duplicates
  earnedBadges[badgeType] = true;

  alert("Congratulations! You've earned the " + badgeText + " badge!");
}
