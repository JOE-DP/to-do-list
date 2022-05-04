
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
