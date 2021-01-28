import React, { Component } from 'react';
import './list-selector.scss'

export default class ListSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            selected: value,
        })
        let { onChange } = this.props;
        onChange(value);

    }

    componentDidMount() {
        this.setState({
            selected: this.props.default || ""
        })
    }

    render() {
        let { selected } = this.state;
        let { items, title } = this.props;
        let itemToListItem = item => <li key={item.value} className={item.value === selected ? "selected": ""} 
        onClick={() => this.onChange(item.value)} key={item.value}>{item.label}</li>;
        let listItems = items.map(itemToListItem);
        return (
            <div className="list-selector">
                <div className="flex-column">
                    <label className="label">{title}</label>
                    <div className="control">
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
