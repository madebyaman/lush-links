import { Box, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatComponentProps {
  label: string;
  loading: boolean;
  data?: string | number;
  icon: React.ReactNode;
}

export default function DashboardStat({
  label,
  loading,
  data,
  icon,
}: StatComponentProps) {
  if (loading) {
    return (
      <StatComponent label={label} icon={icon}>
        <Skeleton height="1.5rem" width="6rem" />
      </StatComponent>
    );
  }
  if (data) {
    return (
      <StatComponent label={label} icon={icon}>
        {data}
      </StatComponent>
    );
  }
  return null;
}

function StatComponent({
  children,
  icon,
  label,
}: {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Stat maxW="sm">
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
          backgroundColor="gray.200"
          color="gray.800"
          borderWidth={'0'}
        >
          {icon}
        </Box>
        <Box>
          <StatLabel color="gray.500">{label}</StatLabel>
          <StatNumber fontSize={'lg'}>{children}</StatNumber>
        </Box>
      </Box>
    </Stat>
  );
}
