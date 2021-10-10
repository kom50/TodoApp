import React from 'react';
import './App.css';
import { MdDelete, MdEdit } from 'react-icons/md';

let editId = null;
const App = () => {
	const [items, setItems] = React.useState([
		{
			value: 'React App',
			id: 0,
		},
	]);
	const [value, setValue] = React.useState('');
	const [isEdit, setEdit] = React.useState(false);
	const [btnValue, setBtnValue] = React.useState('Add');
	let buttonRef = null;
	let inputRef = null;
	// code
	const clickHandler = (event) => {
		if (isEdit) {
			items[editId].value = value;
			//  After update change isEdit value true to false
			setEdit(false);
			setBtnValue('Add');
			// setItems([...items, { value: value, id: items.length}]);
		} else {
			if (value !== '') {
				setItems([...items, { value: value, id: items.length++ }]);
			}
		}
		// set value empty after append in items array
		setValue('');
	};

	// call when items change
	React.useEffect(() => {
		console.log('useEffect items ');
	}, [items]);

	React.useEffect(() => {
		console.log('useEffect');
	});

	const changeHandler = (event) => {
		setValue(event.target.value);
	};

	// delete item from a todo list
	// delete function start
	const deleteItem = (id) => {
		if (!isEdit) {
			setItems((prevItems) => {
				return prevItems.filter((item) => item.id !== id);
			});
		}
	};
	// delete function end

	// edit function start
	const editItem = (id) => {
		setBtnValue('Update');
		buttonRef.value = btnValue;
		inputRef.focus();

		//find index of edited item
		editId = items.findIndex((item) => {
			return item.id === id;
		});
		// for update items list
		setEdit(true);
		//  get Value of edit item from items array
		setValue(
			items.find((item) => {
				return item.id === id;
			}).value
		);
	};
	// edit function end
	return (
		<div className="main_bg container-fluid ">
			<div className="row">
				<div className="main col-12 col-md-8 bg-light  mx-auto ">
					<div className="row bg-light">
						<div className="col-12 col-md-10 mx-auto">
							<div className="header bg-warning p-4   ">
								<h2 className="title my-4 text-center	">
									Todo List App
								</h2>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={value}
										onChange={changeHandler}
										ref={(ele) => (inputRef = ele)}
									/>
									<div className="input-group-append">
										<input
											type="button"
											value={btnValue}
											className="btn btn-primary"
											onClick={clickHandler}
											ref={(ele) => (buttonRef = ele)}
										/>
									</div>
								</div>
							</div>
							<div className="list mt-5">
								{items.map((item, index) => {
									return (
										<List
											key={item.id}
											deleteHandler={deleteItem}
											editHandler={editItem}
											{...item}
											index={index}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// List function component
const List = ({ index, id, value, editHandler, deleteHandler }) => {
	return (
		<>
			<li className=" d-flex align-items-center list-group-item list-group-item-action mt-1 p-1 py-0 mx-auto rounded-2">
				<span className="mx-2">
					<b>{index + 1}. </b>
				</span>
				{value}
				<button
					className="btn btn-danger ms-auto m-1"
					title="Delete Item"
					onClick={() => deleteHandler(id)}>
					<MdDelete />
				</button>
				<button
					className="btn btn-success"
					title="Edit Item"
					onClick={() => editHandler(id)}>
					<MdEdit />
				</button>
			</li>
		</>
	);
};
export default App;
