import React from "react";
// navigator
import { useNavigate } from "react-router-dom";

function NotFoundPage(props) {
    let navigate = useNavigate();
  return (
    <main className="bg-neutral-900 flex flex-col px-5">
      <section className="self-center flex  max-w-full flex-col mt-11">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a98b6c02-3355-4ebf-819b-7d92b415735c?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&"className="aspect-[2.19] object-cover object-center w-[276px] overflow-hidden self-center max-w-full"
          alt="Image 1"
        />
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cc60249a-486a-4835-aba1-e18c72e09426?apiKey=7f0baad4d80b4c3fbc590792ce33acb8&"className="aspect-[0.95] object-cover object-center w-[369px] justify-center items-center overflow-hidden self-center max-w-full mt-7"
          alt="Image 2"
        />
        <h1 className="text-white text-center font-semibold text-3xl self-stretch max-md:max-w-full max-md:text-4xl">
          Oops, You've Ventured into the Unknown!
        </h1>
      </section>
      <section className="self-center flex w-[683px] max-w-full flex-col ml-7 mt-9 mb-44">
        <p className="text-white text-center text-md font-semibold self-stretch max-md:max-w-full">
          It seems like you've discovered a page that's as elusive as a unicorn in a thunderstorm. Don't worry; even astronauts get lost in space sometimes. But fear not, intrepid traveler! We've got a few warp-speed options to get you back on track:
        </p>
        <a
          href="/"
          className="bg-[#F5DD5F] p-2 rounded-3xl w-40 h-12 hover:bg-bluish hover:text-white self-center mt-4"
        >
          <h2 className="text-black text-center text-xl font-medium self-center -mt-px mb-px ">
            Home
          </h2>
        </a>
      </section>
    </main>
  );
}

export default NotFoundPage;