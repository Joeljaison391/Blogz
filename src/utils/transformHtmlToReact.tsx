import React from 'react';

const transformHtmlToReact = (htmlContent: string) => {
  const div = document.createElement('div');
  div.innerHTML = htmlContent;

  const applyTailwindClasses = (element: HTMLElement): React.ReactNode => {
    switch (element.tagName.toLowerCase()) {
      case 'h1':
        return <h1 className="text-3xl font-bold my-4 underline">
          {element.textContent}</h1>;
      case 'h2':
        return <h2 className="text-2xl font-semibold my-3">{element.textContent}</h2>;

      case 'h3':
        console.log('H3:', element.textContent);
        return <h3 className="text-xl font-semibold my-2">{element.textContent}</h3>;
      case 'p':

        // check if the element has an image

        if (element.querySelector('img')) {
          console.log('Image source:', element.querySelector('img')?.getAttribute('src'));
          return <img  src={element.querySelector('img')?.getAttribute('src') ?? undefined} alt={element.querySelector('img')?.getAttribute('alt') ?? undefined} className="my-4 rounded-sm " height={200} width={500} />;
        }

        return <p className="my-2 leading-relaxed">{element.textContent}</p>;
      case 'ul':
        return <ul className="list-disc pl-5 my-4">{Array.from(element.children).map((child, index) => (
          <React.Fragment key={index}>{applyTailwindClasses(child as HTMLElement)}</React.Fragment>
        ))}</ul>;
      case 'ol':
        return <ol className="list-decimal pl-5 my-4">{Array.from(element.children).map((child, index) => (
          <React.Fragment key={index}>{applyTailwindClasses(child as HTMLElement)}</React.Fragment>
        ))}</ol>;
      case 'li':
        return <li className="my-1">{element.textContent}</li>;
        case 'img':
          console.log('Image source:', element.getAttribute('src'));
          return <img src={element.getAttribute('src') ?? undefined} alt={element.getAttribute('alt') ?? undefined} className="my-4 rounded" />;
        
        
      case 'a':
        return <a href={element.getAttribute('href') ?? '#'} className="text-blue-500 hover:underline">{element.textContent}</a>;
      default:
        return <span>{Array.from(element.childNodes).map((child, index) => (
          <React.Fragment key={index}>{transformNode(child)}</React.Fragment>
        ))}</span>;
    }
  };

  const transformNode = (node: ChildNode): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      return applyTailwindClasses(element);
    }
    return null;
  };

  return Array.from(div.childNodes).map((node, index) => (
    <React.Fragment key={index}>{transformNode(node)}</React.Fragment>
  ));
};

export default transformHtmlToReact;
