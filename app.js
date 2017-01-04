
var state = {
	items: []
};

function startAddingItems(formElement, entryElement, dataListID, listElement, newItemID, state){
		formElement.submit(function(event){
		event.preventDefault();
		var addedItem = formElement.find(newItemID).val();
		addItem(state, addedItem);
		renderList(state, listElement, dataListID);

		this.reset();
	})
}

function addItem(state, item){
	state.items.push({
		displayName: item,
		checkedOff: false
	});
}

function renderList(state, listElement, dataListID){
	var itemsli = state.items.map(function(item, index){
		return renderItem(item, index, listElement, dataListID)
	});

	listElement.html(itemsli);
}

function renderItem(item, index, listElement, dataListID){
	
	var listFormat = getListFormat();
	listFormat.find('.shopping-item').text(item.displayName);

	if(item.checkedOff){
		listFormat.find(uncheckedElement).addClass('shopping-item_checked');
	}

	listFormat.find('.shopping-item-toggle');
	listFormat.attr(dataListID, index);
	return listFormat;

}

function getListFormat(){
	var listFormat = '<li>' +
		'<span class="shopping-item"></span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>';

      return $(listFormat);
}

function startCheckItem(dataListID, listElement, toggleButtonID, state){
	listElement.on('click', toggleButtonID, function(event){

		console.log($(event.currentTarget.closest('li')));
		console.log(dataListID);
		debugger;

		var correspondingID = $(event.currentTarget.closest('li')).attr(dataListID);
		console.log(correspondingID);
		debugger;
		var currentItem = getItem(state, correspondingID);

		changeItem(state, correspondingID, {
			displayName: currentItem.displayName,
			checkedOff: !currentItem.checkedOff
		});
		renderList(state, listElement, dataListID);
	})
}

function startDeleteItem(dataListID, listElement, state){
	$('.shopping-item-delete').click(function(event){
		var correspondingID = $(event.currentTarget.closest('li')).attr(dataListID);

		deleteItem(state, correspondingID);
		renderList(state, listElement, dataListID);
	})
}

function getItem(state, correspondingID){
	return state.items[correspondingID];
}

function changeItem(state, correspondingID, newItemState){
	state.items[correspondingID] = newItemState;
}

function deleteItem(state, correspondingID){
	state.items.splice(correspondingID, 1);
}


$(function(){
	var formElement = $('#js-shopping-list-form');
	var entryElement = $('#shopping-list-entry');
	var listElement = $('.shopping-list');
	var dataListID = 'data-list-item-id';
	var newItemID = '#shopping-list-entry';

	var toggleButtonID = '.shopping-item-toggle';

	startAddingItems(formElement, entryElement, dataListID, listElement, newItemID, state);
	startDeleteItem(dataListID, listElement, toggleButtonID, state);
	startCheckItem(dataListID, listElement, state);
})