import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import unicornbikeImg from './../assets/images/unicornbikeImg.jpg'; 
import rcentsSmallLogo from './../assets/images/rcentsSmallLogo.png'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    container :{
        paddingTop: '5%',
    }
  }));

const cards = [1, 2, 3, 4, 5];

export default function LandingPage(){     
    const classes = useStyles()
    return (
        <>
            <Container maxWidth="sm" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    R-Cent-S
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Something short and leading about the collection below—its contents, the creator, etc.
                    Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                    entirely.
                </Typography>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={6} >
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={rcentsSmallLogo}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            Heading
                            </Typography>
                            <Typography>
                            This is a media card. You can use this section to describe the content.
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
            
        </>
    )
}

