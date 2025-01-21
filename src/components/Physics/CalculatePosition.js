export function calculatePosition(value, containerSize, elementSize) {
    // Gérer les chaînes de pourcentage (par exemple, "50%")
    if (typeof value === "string" && value.endsWith("%")) {
      const percentage = parseFloat(value) / 100;
      return containerSize * percentage;
    }
  
    // Gérer les valeurs en pixels directes
    if (typeof value === "number") {
      return value;
    }
  
    // Si aucune valeur n'est fournie, centrer l'élément
    return (containerSize - elementSize) / 2;
  }