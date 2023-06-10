import DashboardShell from '@/components/dashboard-shell';
import EmptyState from '@/components/empty-state';
import { useAuth } from '@/lib/auth';
import { IAnalyticsData } from '@/types/types';
import {
  Box,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiMousePointer, FiUser } from 'react-icons/fi';

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState<{
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
    data: IAnalyticsData | null;
  }>({ status: 'INIT', data: null });
  const user = useAuth();

  useEffect(() => {
    let mounted = true;
    if (user?.user?.uid && mounted) {
      setAnalyticsData({ status: 'LOADING', data: null });
      fetch(`/api/analytics-data/${user?.user?.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (mounted) {
            setAnalyticsData({
              status: 'SUCCESS',
              data: { ...data },
            });
          }
        })
        .catch((err) => {
          if (mounted) {
            setAnalyticsData({ status: 'ERROR', data: null });
          }
        });

      return () => {
        mounted = false;
      };
    }
  }, [user?.user?.uid]);

  return (
    <DashboardShell>
      <Box
        display={'flex'}
        flexDirection={['column', 'row']}
        width="full"
        gap="6"
      >
        <Stat>
          <Box
            shadow={'md'}
            backgroundColor={'white'}
            padding={'1rem'}
            rounded={'md'}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            gap="1rem"
          >
            <Box
              rounded={'md'}
              border={'1px solid'}
              h={'3rem'}
              w={'3rem'}
              display={'grid'}
              placeContent={'center'}
              backgroundColor="gray.600"
              color="white"
            >
              <FiUser size="1.5rem" />
            </Box>
            <Box>
              <StatLabel color="gray.500">Pageviews</StatLabel>
              <StatNumber fontSize={'lg'}>
                {analyticsData.status === 'LOADING' ? (
                  <Skeleton height="1.5rem" width="6rem" />
                ) : analyticsData.data?.pageviewCount ? (
                  analyticsData.data?.pageviewCount
                ) : (
                  'No data'
                )}
              </StatNumber>
            </Box>
          </Box>
        </Stat>

        <Stat>
          <Box
            shadow={'md'}
            backgroundColor={'white'}
            padding={'1rem'}
            rounded={'md'}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            gap="1rem"
          >
            <Box
              rounded={'md'}
              backgroundColor={'gray.600'}
              h={'3rem'}
              w={'3rem'}
              display={'grid'}
              placeContent={'center'}
              color="white"
            >
              <FiMousePointer size="1.5rem" />
            </Box>
            <Box>
              <StatLabel color="gray.500">Clicks</StatLabel>
              <StatNumber fontSize={'lg'}>
                {analyticsData.status === 'LOADING' ? (
                  <Skeleton height="1.5rem" width="6rem" />
                ) : analyticsData.data?.clickCounts?.length ? (
                  analyticsData.data?.clickCounts?.reduce(
                    (prev, cur) => prev + cur.count,
                    0
                  )
                ) : (
                  'No data'
                )}
              </StatNumber>
            </Box>
          </Box>
        </Stat>
      </Box>
      {analyticsData.data ? (
        <TableContainer mt="4rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Link</Th>
                <Th>Clicks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {analyticsData.data?.clickCounts?.map((item, i) => (
                <Tr key={`link-${i}`}>
                  <Td>{item.url}</Td>
                  <Td>{item.count}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
