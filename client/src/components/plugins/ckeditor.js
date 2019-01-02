import React, { Component } from "react";
import { timingSafeEqual } from "crypto";

export default class CKEditor extends Component {
    constructor(props) {
        super(props);
        this.elementName = "editor_" + this.props.name;
     
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        console.log(this.props.value);
        return (
            <textarea name={this.elementName} contenteditable='true'  defaultValue={this.props.value} onChange={this.props.onChange}></textarea>
        )
    }

    componentDidMount() {
        let configuration = {
            toolbar: "Basic",
        };
        window.CKEDITOR.config.width="100%";
     
        window.CKEDITOR.replace(this.elementName, configuration);
        
     
        window.CKEDITOR.instances[this.elementName].on("change", function () {
            let data = window.CKEDITOR.instances[this.elementName].getData();

            this.props.onChange(data);
        }.bind(this));

    }
}