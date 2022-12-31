// Questions are in the [1, 5] integer interval, but the Radar widget uses the scale [0,100]
export function scaleValue(value, from, to) {
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return Math.floor(capped * scale + to[0]);
}


export function addToAverage( average, size, value)
{
    return (size * average + value) / (size + 1);
}