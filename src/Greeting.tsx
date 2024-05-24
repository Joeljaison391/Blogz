

interface GreetingProps {
    name: string;
}

const Greeting = ({ name }: GreetingProps) => <div className='underline'>Hello, {name}!</div>;

export default Greeting;
