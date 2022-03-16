import React, { useState } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Stack,
  Link,
  Avatar,
  useToast
} from '@chakra-ui/react';
import axios from "axios";

export default function Home() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tweets, setTweets] = useState(null);

  const getTopic = async () => {
    if (!inputValue) {
      toast({
        title: 'Invalid',
        description: "Enter a username",
        status: 'warning',
        duration: 3000
      })
      return;
    }
    try {
      setIsLoading(true);
      setTweets(null)
      const response = await axios.get("/api/tweet", {
        params: {
          username: inputValue
        }
      })
      setTweets({
        username: response.data.username,
        timeline: response.data.timeline._realData.data
      })
      toast({
        title: 'User found',
        description: "User tweets displayed",
        status: 'success',
        duration: 3000
      })
      setIsLoading(false);
    } catch {
      toast({
        title: 'User not found',
        description: "Tweeter handle not found",
        status: 'error',
        duration: 3000
      })
      setIsLoading(false);
    }
  }


  return (
    <>
      <Head>
        <title>Twitter champions 🦸🏻‍♂️</title>
        <meta name="description" content="Twitter champions by Evergreen George" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h2 className={styles.title}>Twitter champions 🦸🏻‍♂️</h2>

        <p className={styles.subTitle}>Enter a Twitter @handle</p>

        <p className={styles.howToText}>Get thier tweets</p>

        <Stack spacing={4} direction='row' className={styles.mb_100}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
              children='@'
            />
            <Input disabled={isLoading} placeholder='enter a Twitter @handle' value={inputValue} onChange={event => setInputValue(event.target.value)} />
          </InputGroup>
          <Button isLoading={isLoading} onClick={getTopic} >Search</Button>
        </Stack>

        {tweets && (
          <>
            <Button colorScheme='twitter' className={styles.mb_100} >
              Tweets of {tweets.username}
            </Button>
            <div>
              {tweets.timeline.map(tweet => {
                return (
                  <p className={styles.tweetContainer} key={tweet.id}>
                    <Avatar src="/tweeter.png" alt="/tweeter.png" className={styles.image} />
                    <span className={styles.text}>{tweet.text}</span>
                  </p>
                )
              })}
            </div>
          </>
        )}






      </main>

      <footer className={styles.footer}>
        <span>Created with passion by </span><Link target="_blank" className={styles.link} href="https://twitter.com/georgeevergreen">@georgeevergreen</Link>
      </footer>
    </>
  )
}

