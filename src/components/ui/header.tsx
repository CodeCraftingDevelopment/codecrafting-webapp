import {CodecraftLogo} from "@/components/images/svg/CodecraftLogo";
import {Box, Flex, Grid, GridItem} from "@chakra-ui/react";
import {ColorModeButton} from "@/components/ui/color-mode";

const color = ""


export default function Header(){
    return (
        <header>

                <Grid
                    templateColumns={"repeat(12, 1fr)"}
                    templateRows={"repeat(3, 1fr)"}
                    gap={2}
                    padding={2}
                    shadow="md"
                >
                    <GridItem bg={color} rowSpan={3} colSpan={1}>
                        <Box pb={3} pr={3}>
                            <CodecraftLogo width={120} height={120}/>
                        </Box>
                    </GridItem>
                    <GridItem bg={color} colSpan={9} rowSpan={1} p={2}
                              display="flex"
                              alignItems="center"
                    >
                        <Flex gap="4">
                            <p>Environnement : {process.env.NEXT_PUBLIC_ENV}</p>
                            <a>test</a>
                        </Flex>
                    </GridItem>
                    <GridItem bg={color} colSpan={2} rowSpan={1} p={2}
                              display="flex"
                              alignItems="center" justifyContent="flex-end"
                    >
                        <ColorModeButton padding={0} margin={0} size={"2xs"}/>

                    </GridItem>
                    <GridItem bg={color} colSpan={11} rowSpan={2} p={2}>

                        <p>dsfsd</p>
                    </GridItem>
                </Grid>

        </header>
    )
}