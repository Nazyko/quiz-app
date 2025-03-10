import { Button, Flex, useMantineColorScheme } from "@mantine/core"
import "./Options.css"
import { useState } from "react";


export const Options = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const [limit, setLimit] = useState<number>(10)

    const handleChange = ()  => {
        localStorage.setItem('limit', JSON.stringify(limit))
    }

  return (
    <div className="wrapper">
        <Flex align='center' justify='center' direction='column'>
            <h1 className="options-title">Sazlamalar</h1>
            <div className="options">
                <Flex gap={150} align='center'>
                    <p>Sistema temasın ózgertiw:</p>
                    <Button
                        variant="outline"
                        color={dark ? 'yellow' : 'black'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle color scheme"
                    >
                        {dark ? (
                            <p>light</p>
                        ) : (
                            <p>dark</p>
                        )}
                    </Button>
                </Flex>
                <Flex gap={165} align='center'>
                    <div>Sorawlar sanın ózgertiw</div>
                    <div>
                        <input 
                            type="text" 
                            value={limit} 
                            onChange={(e) => {
                                const value = e.target.value;
                                setLimit(Number(value));
                            }}
                        />
                    </div>
                </Flex>
                <Button color="yellow" onClick={handleChange} mt={25}>Sorawlar sanın ózgertiw</Button>
            </div>
        </Flex>
    </div>
  )
}

