import SVGPathCommander from "svg-path-commander";

// Fonction pour convertir un chemin SVG `d` en une liste de sommets
export function parsePathToVertices(path, sampleLength = 15) {
  // Convertir le chemin en commandes absolues
  const commander = new SVGPathCommander(path);

  const points = [];
  let lastPoint = null;

  // Obtenir la longueur totale du chemin
  const totalLength = commander.getTotalLength();
  let length = 0;

  // Échantillonner des points le long du chemin
  while (length < totalLength) {
    const point = commander.getPointAtLength(length);

    // Ajouter le point uniquement s'il est différent du dernier
    if (!lastPoint || point.x !== lastPoint.x || point.y !== lastPoint.y) {
      points.push({ x: point.x, y: point.y });
      lastPoint = point;
    }

    length += sampleLength;
  }

  // S'assurer que le dernier point est inclus
  const finalPoint = commander.getPointAtLength(totalLength);
  if (
    lastPoint &&
    (finalPoint.x !== lastPoint.x || finalPoint.y !== lastPoint.y)
  ) {
    points.push({ x: finalPoint.x, y: finalPoint.y });
  }

  return points;
}