const activate = (elem) => {
	if (elem) elem.classList.add('active')
}

const deactivate = (elem) => {
	if (elem) elem.classList.remove('active')
}

const deactivateAll = (nodelist) => {
	nodelist.array.forEach(elem => {
		elem.classList.remove('active')
	})
}

export const DOMHelpers = {
	activate,
	deactivate,
	deactivateAll
}