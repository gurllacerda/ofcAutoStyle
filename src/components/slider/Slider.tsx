// import Image from 'next/image';
import { ReactNode } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Link from 'next/link';



interface SliderProps {
    children: ReactNode;
}

const Slider = ({ children }: SliderProps): JSX.Element => {
    const carouselItens = [
        {
            banner: '/IMG/novoCarroRapidoNaPista.jpg',
            name: 'Carro rápido na pista',
        },
        {
            banner: '/IMG/novoFastCar2.jpg',
            name: 'Carro veloz',
        },
        // Adicione mais itens conforme necessário
    ];

    return (
        <div id="default-carousel" className="relative w-full overflow-hidden" data-carousel="slide">
            {/* Navbar ou outros conteúdos passados como children */}
            {children}

            {/* <Carousel showThumbs={false} autoPlay>
                {carouselItens.map((product) => (
                    <div key={product.name}>
                        <Link href={`/product/${product.slug}`} passHref>
                        <a className="flex">
                            <Image
                                src={product.banner}
                                alt={product.name}
                                width={500} // Largura em pixels
                                height={300} // Altura em pixels
                                
                            />
                        </a>
                        </Link>
                    </div>
                ))}
            </Carousel> */}

        </div>
    );
};

export default Slider;