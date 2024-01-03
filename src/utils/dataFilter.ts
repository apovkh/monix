import { DATE_TYPES, type IBalanceItem } from '../types/'

export function filterByDate (
	inputArray: IBalanceItem[],
	filterType: DATE_TYPES
): IBalanceItem[] {
	const currentDate = new Date()
	const oneDay = 24 * 60 * 60 * 1000
	const oneWeek = 7 * oneDay

	return inputArray.filter((item: IBalanceItem) => {
		const itemDate = new Date(item.date)

		if (filterType === DATE_TYPES.Today) {
			return (
				itemDate.toDateString() === currentDate.toDateString()
			)
		}

		if (filterType === DATE_TYPES.Yesterday) {
			const yesterday = new Date(currentDate)
			yesterday.setDate(currentDate.getDate() - 1)
			return (
				itemDate.toDateString() === yesterday.toDateString()
			)
		}

		if (filterType === DATE_TYPES.Week) {
			const oneWeekAgo = new Date(currentDate - oneWeek)
			return itemDate >= oneWeekAgo
		}

		if (filterType === DATE_TYPES.Month) {
			return (
				itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
			)
		}

		if (filterType === DATE_TYPES.Year) {
			return itemDate.getFullYear() === currentDate.getFullYear()
		}

		if (filterType === DATE_TYPES.FullTime) {
			return inputArray
		}
	})
}
