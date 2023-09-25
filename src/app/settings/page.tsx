'use client';

import { useState } from 'react';
import { type NextPage } from 'next';

import { usePublishEvent } from '@/hooks/usePublishEvent';


const Page: NextPage = (props) => {
  const {} = props;

  const { publish } = usePublishEvent()

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = {
      created_at: Math.floor(Date.now() / 1000),
      name,
      about,
    };

    publish({ 
      kind: 0,
      content: JSON.stringify(content),
    }).then(res => console.log('res', res))
  };

  return (
    <>
      <h1>Configuracion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Nombre'
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type='text'
          name='about'
          id='about'
          placeholder='Sobre ti...'
          required
          onChange={(e) => setAbout(e.target.value)}
        />
        <br />
        <button type='submit'>Guardar</button>
      </form>
    </>
  );
};

export default Page;
