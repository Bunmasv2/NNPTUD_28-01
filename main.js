function initTable() {
    const tableBody = document.getElementById('product-body')

    fetch('https://api.escuelajs.co/api/v1/products')
        .then(res => {
            if (!res.ok) throw new Error('Cannot load data.json')
            return res.json()
        })
        .then(rawData => {
            const rows = rawData.map(item => {
                let imgUrl = item.images[0]
                if (
                    imgUrl.includes('placeimg.com') ||
                    imgUrl.includes('via.placeholder.com')
                ) {
                    imgUrl = `https://placehold.co/100x100?text=${encodeURIComponent(item.category.name)}`
                }

                return `
                    <tr>
                        <td>${item.id}</td>
                        <td>
                            <img src="${imgUrl}"
                                alt="${item.title}"
                                class="img-box"
                                onerror="this.src='https://placehold.co/100x100?text=No+Image'">
                        </td>
                        <td><strong>${item.title}</strong></td>
                        <td><span class="cat-badge">${item.category.name}</span></td>
                        <td>${item.description}</td>
                        <td class="price">${item.price.toLocaleString()} $</td>
                    </tr>
                `
            }).join('')

            tableBody.innerHTML = rows
        })
        .catch(err => console.error(err))
}

document.addEventListener('DOMContentLoaded', initTable)