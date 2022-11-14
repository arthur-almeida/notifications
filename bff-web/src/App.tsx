import { useState } from 'react';
import './App.css'
import Caption, { defaultCaptionProps } from './components/Caption';
import Redirect, { defaultRedirectProps } from './components/Redirect';
import Title, { defaultTitleProps } from './components/Title';
import Image, { defaultImageProps } from './components/Image';
import Item, { defaultItemProps } from './components/Item';
import axios from 'axios';

const components = {
  'Title': Title,
  'Caption': Caption,
  'Redirect': Redirect,
  'Image': Image,
  'Item': Item,
};

type PossibleComponents = keyof typeof components | '';

type Props = {
  [key: string]: string,
}

type ComponentFields = {
  [key in PossibleComponents]: string[];
}

const componentFields: ComponentFields = {
  '': [],
  Title: Object.keys(defaultTitleProps),
  Caption: Object.keys(defaultCaptionProps),
  Redirect: Object.keys(defaultRedirectProps),
  Image: Object.keys(defaultImageProps),
  Item: Object.keys(defaultItemProps),
}

type Component = {
  name: string;
  props: object;
}

function App() {
  const [selectedComponent, setSelectedComponent] = useState<PossibleComponents>('');
  const [properties, setProperties] = useState<Props>({});
  const [notificationPreview, setNotificationPreview] = useState<Component[]>([]);
  
  function handleSelectComponent(component: PossibleComponents) {
    setSelectedComponent(component);
    setProperties({});
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProperties((previousValue) => ({
      ...previousValue,
      [name]: value
    }));
  }
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedComponent) return;
    setNotificationPreview((previousValue) => ([
      ...previousValue,
      {
        name: selectedComponent,
        props: properties
      }
    ]));
  }

  async function sendNotification() {
    await axios.post('http://192.168.0.106:3333/send-notification', {
      expoPushToken: "ExponentPushToken[PanGWHLmFZFl1N3qG7-GJ4]",
      message: "teste do frontend",
      content: notificationPreview,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='section'>
          <select 
            onChange={(e) => handleSelectComponent(e.target.value)}
            value={selectedComponent} 
          >
            <option value="">Componentes</option>
            {Object.values(components).map((component) => (
              <option 
                key={component.name} 
                value={component.name}
              >
                {component.name}
              </option>
            ))}
          </select>
          <form className='form' onSubmit={(e) => handleSubmit(e)}>
            {componentFields[selectedComponent].map((field) => (
              <input 
                type="text"
                key={field}
                name={field}
                onChange={(e) => handleInputChange(e)}
                placeholder={field}
                required
                value={properties[field]}
              />
            ))}
            <button
              className='addComponent'
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </div>
        <div className='section'>
          <pre>
            <code>
              <p>{JSON.stringify(notificationPreview, null, 4)}</p>
            </code>
          </pre>
          <button className='addComponent' onClick={sendNotification}>
              enviar notificação
            </button>
        </div>
        <div className='section'>
          <div className='preview'>
            {
              notificationPreview.map((element, index) => {
                const Component = components[element.name];

                return (
                  <Component key={element.name + index} {...element.props} />
                )
              })
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App
