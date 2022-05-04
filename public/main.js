
let deleteButton = document.querySelectorAll('.fa-dumpster')
Array.from(deleteButton).forEach(element => element.addEventListener('click', deleteListItem))


function deleteListItem(click){
    let itemName = click.target.parentNode.textContent
    fetch('/deleteItem', {
    method: 'delete',
    headers: {'Content-Type': 'application/JSON'}, 
    body: JSON.stringify({'deleteItem': itemName})})
        .then(() => window.location.reload())
        
}


let completeButton = document.querySelectorAll('.listItem')
Array.from(completeButton).forEach(element => element.addEventListener('click', modifyComplete))

function modifyComplete(click){
    let itemName = click.target.parentNode.textContent
    fetch('/modifyComplete', {
        method: 'put',
        headers: {'Content-Type': 'application/JSON'},
        body: JSON.stringify({'modifyItem': itemName})
    })
    .then(() => window.location.reload())
}
