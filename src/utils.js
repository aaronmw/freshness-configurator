const roundTo = (num, nearest) => Math.ceil(num / nearest) * nearest;

const toInt = str => parseInt(str, 10);

const blur = evt => {
	if (evt.key === 'Enter') {
		evt.target.blur();
	}
};

export { roundTo, toInt, blur };
