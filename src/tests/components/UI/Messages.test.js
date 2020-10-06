import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import Messages from '../../../components/UI/Messages';

it('<Messages /> renders with error and message', () => {
  const Component = <Messages message="Success" type="success" />;

  expect(renderer.create(Component).toJSON()).toMatchSnapshot();

  const { getByText } = render(Component);
  expect(getByText('Success'));
});

it('<Messages /> renders with error and message', () => {
  const Component = <Messages message="Error" type="error" />;

  expect(renderer.create(Component).toJSON()).toMatchSnapshot();

  const { getByText } = render(Component);
  expect(getByText('Error'));
});

it('<Messages /> renders with info and message', () => {
  const Component = <Messages message="Warning" type="info" />;

  expect(renderer.create(Component).toJSON()).toMatchSnapshot();

  const { getByText } = render(Component);
  expect(getByText('Warning'));
});
