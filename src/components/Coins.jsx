import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '..';
import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const btns = new Array(132).fill(1);
  let currencySymbol = '$';
  if (currency === 'inr') {
    currencySymbol = '₹';
  } else if (currency === 'eur') {
    currencySymbol = '€';
  } else {
    currencySymbol = '$';
  }
  const changePage = page => {
    setPage(page);
    setLoading(true);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error)
    return (
      <Error message={'Error while Fetching Coins, please check the URL'} />
    );

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup onChange={setCurrency} p="4">
            <HStack spacing={'4'} justifyContent={'center'}>
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="usd">USD($)</Radio>
              <Radio value="eur">EURO(€)</Radio>
            </HStack>
          </RadioGroup>
          <VStack>
            <Text>Current Page : {page}</Text>
          </VStack>

          <HStack flexWrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(i => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w="full" overflowX={'auto'} p="8" id="paginator">
            {btns.map((utem, index) => (
              <Button key={index} onClick={() => changePage(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
