import {CodecraftLogo} from "@/components/images/svg/CodecraftLogo";
import {Box, Flex, Grid, GridItem, Text} from "@chakra-ui/react";
import {ColorModeButton} from "@/components/ui/color-mode";

const color = ""


export default function Header(){

    const gridItems: React.CSSProperties = {
        // backgroundColor: 'teal',
        overflow: 'hidden'
    };

    const content: React.CSSProperties = {
        // backgroundColor: 'cadetblue',
        overflow: 'hidden'
    };

    return (
        <header>

                <Grid
                    templateColumns={"repeat(12, 1fr)"}
                    templateRows={"repeat(2, 1fr)"}
                    gap={2}
                    padding={2}
                    shadow="lg"
                >
                    <GridItem bg={color}
                              rowSpan={2}
                              colSpan={{ base: 12, sm: 2, md: 1, lg: 1 }}
                              // minW={{ base: "100%", md: "200px", lg: "120px" }}
                              minW={120}
                              style={gridItems}
                              mx={{ base: "auto", sm: "0", md: "0", lg: "0" }}
                    >
                        <Box style={content} pb={3}>
                            <CodecraftLogo width={110} height={110} />
                        </Box>
                    </GridItem>
                    <GridItem bg={color}
                              colSpan={{ base: 12, sm: 10, md: 9, lg: 9 }}
                              rowSpan={1}
                              p={2}
                              style={gridItems}
                              display="flex"
                              alignItems="center"
                    >
                        <Flex gap="4">
                            <Text style={content}>Environnement : {process.env.NEXT_PUBLIC_ENV}</Text>
                            <Text style={content}>test</Text>
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
                              colSpan={{ base: 12, sm: 12, md: 11, lg: 11 }}
                              // colSpan={10}
                              rowSpan={1}
                              p={2}
                              style={gridItems}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                    >

                        <Grid
                            templateColumns={"repeat(12, 1fr)"}
                            templateRows={"repeat(1, 1fr)"}
                            gap={8}
                            >
                            <GridItem
                                colSpan={{ base: 12, sm: 12, md: 4, lg: 4 }}
                                rowSpan={1}>
                                <Text style={content} textAlign="center">
                                    Accueil
                                </Text>
                            </GridItem>
                            <GridItem
                                colSpan={{ base: 12, sm: 12, md: 4, lg: 4 }}
                                rowSpan={1}>
                                <Text style={content} textAlign="center">
                                    A propos
                                </Text>
                            </GridItem>
                            <GridItem
                                colSpan={{ base: 12, sm: 12, md: 4, lg: 4 }}
                                rowSpan={1}>
                                <Text style={content} textAlign="center">
                                    Contact
                                </Text>
                            </GridItem>
                        </Grid>



                    </GridItem>
                </Grid>

        </header>
    )
}