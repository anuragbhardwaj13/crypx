import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import { useParams } from 'react-router-dom';
import Error from './Error';
import Chart from './Chart';
const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  let currencySymbol = '$';
  if (currency === 'inr') {
    currencySymbol = '₹';
  } else if (currency === 'eur') {
    currencySymbol = '€';
  } else {
    currencySymbol = '$';
  }

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '365d', 'max'];
  const switchChartStat = i => {
    switch (i) {
      case '24h':
        setDays('24h');
        setLoading(true);
        break;
      case '7d':
        setDays('7d');
        setLoading(true);
        break;
      case '14d':
        setDays('14d');
        setLoading(true);
        break;
      case '30d':
        setDays('30d');
        setLoading(true);
        break;
      case '60d':
        setDays('60d');
        setLoading(true);
        break;
      case '200d':
        setDays('200d');
        setLoading(true);
        break;
      case '365d':
        setDays('365d');
        setLoading(true);
        break;
      case 'max':
        setDays('max');
        setLoading(true);
        break;

      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(chartData);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, days, currency]);
  if (error) return <Error message={'Error while Fetching Coin'} />;

  return (
    <Container maxW={'container.xl'}>
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
          <Box borderWidth={'1'} width={'full'}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack p="4" wrap={'wrap'} justifyContent={'center'}>
            {btns.map(i => (
              <Button onClick={() => switchChartStat(i)} key={i}>
                {i}
              </Button>
            ))}
          </HStack>
          <VStack spacing={'4'} p="16" alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              Last Updated on{' '}
              {Date(coin.market_data.last_updated).split(' G')[0]}
            </Text>
            <Image src={coin.image.large} w="16" g="16" objectFit={'contain'} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[`${currency}`]}
              </StatNumber>
              <StatHelpText>
                {coin.market_data.price_change_percentage_24h > 0 ? (
                  <StatArrow type="increase" />
                ) : (
                  <StatArrow type="decrease" />
                )}
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>

            <Badge fontSize={'2xl'} bgColor={'grey'} color={'blackAlpha.900'}>
              #{coin.market_cap_rank}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              value={
                (coin.market_data.current_price[`${currency}`] /
                  `${coin.market_data.high_24h[currency]}`) *
                100
              }
            />
            <Box w={'full'} p="4">
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item
                title={'Circulating Supply'}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={'Market Cap'}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={'All Time Low'}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={'All Time High'}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w="full" my="4">
      <Text
        justifyContent={'space-between'}
        fontFamily={'Bebas Neue'}
        letterSpacing={'widest'}
      >
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low, value }) => {
  return (
    <VStack w="full">
      <Progress value={value} colorScheme="teal" w="full" />
      <HStack justifyContent={'space-between'} w="full">
        <Badge children={low} colorScheme="red" />
        <Text fontSize={'sm'}>24 Hour</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
