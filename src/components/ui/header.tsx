import {CodecraftLogo} from "@/components/images/svg/CodecraftLogo";
import {Box, Flex, Grid, GridItem} from "@chakra-ui/react";
import {ColorModeButton} from "@/components/ui/color-mode";

const color = ""


export default function Header(){

    const gridItems: React.CSSProperties = {
        backgroundColor: 'teal',
        overflow: 'hidden'
    };

    const content: React.CSSProperties = {
        backgroundColor: 'cadetblue',
    };

    return (
        <header>

                <Grid
                    templateColumns={"repeat(12, 1fr)"}
                    templateRows={"repeat(2, 1fr)"}
                    gap={2}
                    padding={2}
                    shadow="md"
                >
                    <GridItem bg={color}
                              rowSpan={2}
                              colSpan={{ base: 12, sm: 2, md: 2, lg: 2 }}
                              // minW={{ base: "100%", md: "200px", lg: "120px" }}
                              minW={120}
                              style={gridItems}>
                        <Box style={content}>
                            <CodecraftLogo width={120} height={120}/>
                        </Box>
                    </GridItem>
                    <GridItem bg={color}
                              colSpan={{ base: 12, sm: 10, md: 8, lg: 8 }}
                              rowSpan={1}
                              p={2}
                              style={gridItems}
                              display="flex"
                              alignItems="center"
                    >
                        <Flex gap="4">
                            <p style={content}>Environnement : {process.env.NEXT_PUBLIC_ENV}</p>
                            <a style={content}>test</a>
                        </Flex>
                    </GridItem>
                    <GridItem bg={color}
                              // colSpan={2}
                              colSpan={{ base: 12, sm: 10, md: 2, lg: 2 }}
                              rowSpan={1}
                              p={2} style={gridItems}
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                    >
                        <ColorModeButton padding={0} margin={0} size={"2xs"} style={content}/>

                    </GridItem>
                    <GridItem bg={color}
                              colSpan={{ base: 12, sm: 12, md: 10, lg: 10 }}
                              // colSpan={10}
                              rowSpan={1}
                              p={2}
                              style={gridItems}>

                        <p style={content}>dsfsd</p>
                    </GridItem>
                </Grid>

        </header>
    )
}