import React from 'react';
import { ModelPage } from '../components/sections/ModelPage';

export default function ModelDetail({ model }) {
  return <ModelPage key={model.id} model={model} />;
}
