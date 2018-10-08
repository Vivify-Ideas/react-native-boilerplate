import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';

Validator.setMessages('en', en);

const withValidation = (WrappedComponent, formFields, validationRules) => {

  class HOC extends Component {

    state = {
      values: {...formFields},
      errors: {},
    };

    getErrors = (field) => {
      let values = field ? {[field]: this.state.values[field]} : this.state.values;
      let rules = field ? {[field]: validationRules[field]} : validationRules;

      let validator = new Validator(values, rules);
      if (validator.passes()) {
        return null;
      }
      return validator.errors.all();
    }

    validate = (field = null) => {
      let errors = this.getErrors(field);
      if (!errors) {
        return true;
      }

      this.setState(field
        ? {errors: {...this.state.errors, ...errors}}
        : {errors});
      return false;
    }

    setValues = (values) => {
      this.setState({values: {...this.state.values, ...values}});
    }

    resetErrors = (errors = {}) => {
      this.setState({errors});
    }

    handleChange = (field, newValue) => {
      this.setState({
        errors: {...this.state.errors, [field]: null},
        values: {...this.state.values, [field]: newValue},
      });
    }

    getFieldPropsFor = (field) => {
      return {
        value: this.state.values[field],
        onChangeText: value => this.handleChange(field, value),
        onBlur: () => this.validate(field),
      };
    }

    errorMessageFor = (field) => {
      return this.state.errors[field]
        && this.state.errors[field][0]
        && <Text style={styles.error}>{this.state.errors[field][0]}</Text>;
    }

    render = () => {
      return (
        <WrappedComponent
          values={this.state.values}
          errors={this.state.errors}
          validate={this.validate}
          setValues={this.setValues}
          resetErrors={this.resetErrors}
          getFieldPropsFor={this.getFieldPropsFor}
          errorMessageFor={this.errorMessageFor}
          {...this.props}
        >
        </WrappedComponent>
      );
    }
  }

  return HOC;
};

export default withValidation;

const redColor = 'red';
const styles = StyleSheet.create({
  error: {
    color: redColor,
  },
});
