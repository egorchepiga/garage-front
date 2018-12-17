import React, {Component} from 'react';
import {connect} from 'react-redux';
import Combobox from 'react-widgets/lib/Combobox'
import '../styles/datagrip.css'
import 'react-widgets/dist/css/react-widgets.css';
import {getView} from "../store/containers/navigation/action";
import {editDbData} from '../store/containers/datagrip/action'


const procedureCodes = [
    'list',
    '6.1',  // все автомобили и среднюю стоимость услуги для них, включая автомобили, по которым не производились работы
    '5.1.2', // Создать представление, отображающее общий доход мастеров за последний год,
    '4.2.1', // В рамках транзакции в таблице услуг увеличить цену услуги, оказанной последней, на 10.00
    '1.3.2', // Пять мастеров, которые за последний месяц сделали большего всего машин (разных
    '1.3.1', //Вычислить общую стоимость обслуживания отечественных и импортных автомобилей за все время существования сервиса
    '1.2.2', // стоимость обслуживания каждого автомобиля за последний год
    '1.2.1', // все иностранные автомобили, которые обслуживались за последний месяц больше двух раз
    '1.1.2', // все работы за последний месяц
    '1.1.1' //стоимость всех услуг
];
const procedureLabels = [
    'list',
    'Все автомобили и среднюю стоимость услуги для них, включая автомобили, по которым не производились работы', // '6.1',
    'Создать представление, отображающее общий доход мастеров за последний год',                              //'5.1.2',
    'В рамках транзакции в таблице услуг увеличить цену услуги, оказанной последней, на 10.00',               //'4.2.1',
    'Пять мастеров, которые за последний месяц сделали большего всего машин ',                            // '1.3.2',
    'Вычислить общую стоимость обслуживания отечественных и импортных автомобилей за все время существования сервиса',      //'1.3.1',
    'стоимость обслуживания каждого автомобиля за последний год',                                                   //  '1.2.2',
    'все иностранные автомобили, которые обслуживались за последний месяц больше двух раз',                     //  '1.2.1'
    'все работы за последний месяц',                                                                        // '1.1.2'
    'стоимость всех услуг',                                                                                 //'1.1.1'
];


class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    changeView = (value) => {
            this.props.getView(value)
    };

    render() {
        return (
            <div>
                <Combobox
                    onChange={this.changeView}
                    dropDown
                    data={procedureLabels}
                />
            </div>
        )
    }

}

export default connect(state => ({
        store: state
    }), dispatch => ({
        getView : (view) => {
            dispatch(getView(view))
        },
    })
)(Navigation)