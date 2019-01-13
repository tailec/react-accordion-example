import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Accordion>
        <Accordion.Section header="yolo">
          <h1>Hello</h1>
        </Accordion.Section>
        <Accordion.Section header="hello">
          <h1>World</h1>
        </Accordion.Section>
      </Accordion>
    </div>
  );
}

class Accordion extends React.Component {
  static Section = ({ open, click, ...props }) => (
    <AccordionSection open={open} onClick={click} {...props} />
  );

  state = {
    openedSections: {}
  };

  click = header => {
    const isOpen = !!this.state.openedSections[header];
    this.setState(prevState => {
      return {
        openedSections: { ...prevState.openedSections, [header]: !isOpen }
      };
    });
  };

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        open: !!this.state.openedSections[child.props.header],
        click: this.click
      });
    });
  }
}

class AccordionSection extends React.Component {
  render() {
    return (
      <div>
        <button
          className="accordion"
          onClick={() => this.props.onClick(this.props.header)}
        >
          {this.props.header}
        </button>
        <div className={this.props.open ? "panel-open" : "panel"}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
