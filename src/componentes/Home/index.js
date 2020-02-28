import React, { Component } from 'react';
import axios from 'axios';
import {
    Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Row,
    Form,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Spinner
} from 'reactstrap';
import { MdSearch } from 'react-icons/md'

class Home extends Component {
    state = {
        carregando: false,
        meteoro: []
    }

    meteoroDaPaixao = async (evento) => {
        evento.preventDefault();
        this.setState({carregando:true});
        const form = evento.target;
        const inputGroup = form.children[0];
        const input = inputGroup.children[0];
        // Em Comentário, dois exemplos de desestruturação do objeto. O segundo renomeando o objeto que vem Data para seguidores. 
        // 1 const {data} = await axios(`https://api.github.com/users/${input.value}/followers`);
        // 2 const {data : seguidores} = await axios(`https://api.github.com/users/${input.value}/followers`);
        //utilizanda const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`);

        //utilizada this.setState({seguidores:seguidores.data});
        // 1 this.setState({seguidores:data});
        // 2 this.setState({seguidores});
        // const seguidores = await axios(`https://api.bitbucket.org/2.0/users/${input.value}`);
        // console.log(seguidores);



        const key = "aXzXNGsOTBT393bkgb7d7yyMzNe0pHwjMWNWcxLp";
        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=${key}`);
        this.setState({ meteoro: [meteoro.data, ...this.state.meteoro] });
        console.log(meteoro)
        // let regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        this.setState({carregando:false});
        





        // https://api.github.com/users/diogenesistemas/followers
    }

   
    render() {
        return (
            <>
                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.meteoroDaPaixao}>
                                <InputGroup>
                                    <Input type="date"/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ?(<Spinner color="light" size="sm"/>) : (<MdSearch size="20px" />)}                                      
                                            {/* <MdSearch size="20px" /> */}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>
                {/* Sempre que for retornar algo visual, a arearo funciton retorna com prenteses */}
                <Container className="mt-3 mb-5">
                    <Row>
                        {this.state.meteoro.map((meteoro) => (
                            <Col className="d-flex" xs="12" md="4">
                                <Card className="text-white mb-2" color="dark">
                                    <CardImg top width="100%" height="30%" src={meteoro.url} alt="{meteoro.title}" />
                                    <CardBody>
                                        <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                                        <CardSubtitle className="text-muted text-center" >{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
                                        <CardText className="text-justify">{meteoro.explanation}</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </>
        )
    }
}
export default Home;