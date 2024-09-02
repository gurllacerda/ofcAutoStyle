'use client';

import Card from 'antd/es/card/Card';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image'; 

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 space-y-6">
        <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
          Contacts
        </h1>

        <Card
          hoverable
          style={{
            width: 300,
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          cover={
            <div className="relative w-full h-60">
              <Image
                alt="Gustavo Rocha Lacerda"
                src='/IMG/GustavoPicture.jpg' 
                fill // Propriedade do Next.js para preencher o espaço da div pai
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Tamanhos responsivos para otimização
                style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                className="rounded-t-lg object-cover" // Propriedade object-cover para garantir que a imagem cubra toda a área
              />
            </div>
          }
          className="transform hover:scale-105 hover:shadow-xl"
        >
          <Meta
            title="Gustavo Rocha Lacerda"
            description="Full-Stack Developer & CEO"
            style={{ textAlign: 'center' }}
            className="text-orange-600 font-semibold"
          />
        </Card>
      </div>
    </>
  );
}