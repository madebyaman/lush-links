import DashboardShell from '@/components/dashboard-shell';
import DashboardStat from '@/components/dashboard-stat';
import EmptyState from '@/components/empty-state';
import { useAuth } from '@/lib/auth';
import { IAnalyticsData } from '@/types/types';
import {
  Box,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Text,
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

  const totalClicks = analyticsData.data?.clickCounts?.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

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
        <DashboardStat
          label={'Total Pageviews'}
          icon={<FiUser size="1.5rem" />}
          loading={analyticsData.status === 'LOADING'}
          data={analyticsData.data?.pageviewCount}
        />
        <DashboardStat
          label={'Total clicks'}
          icon={<FiMousePointer size="1.5rem" />}
          loading={analyticsData.status === 'LOADING'}
          data={totalClicks}
        />
      </Box>
      {analyticsData.status === 'LOADING' ? (
        <TableContainer mt="4rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Link</Th>
                <Th>Clicks</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Skeleton height="10px" width={'30rem'} />
                </Td>
                <Td>
                  <Skeleton height="10px" width="5rem" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Skeleton height="10px" width="30rem" />
                </Td>
                <Td>
                  <Skeleton height="10px" width="5rem" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <>
          {!analyticsData.data && (
            <Box mb="4">
              <EmptyState />
            </Box>
          )}
          {Array.isArray(analyticsData.data?.clickCounts) &&
          analyticsData.data?.clickCounts.length ? (
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
                      <Td>
                        <Text isTruncated>
                          {item.url.length > 70
                            ? item.url.substring(0, 70) + '...'
                            : item.url}
                        </Text>
                      </Td>
                      <Td>{item.count}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : null}
        </>
      )}
    </DashboardShell>
  );
}
