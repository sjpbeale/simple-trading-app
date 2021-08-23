/**
 * Simple Validation Utils
 */

// Check number and positive value
export const isPositiveNumber = (number) => {
	return !isNaN(Number(number)) && Number(number) > 0;
};
