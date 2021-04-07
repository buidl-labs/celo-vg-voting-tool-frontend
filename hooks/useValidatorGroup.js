import { useQuery } from "urql";

const VG_Query = `
  query{
    ValidatorGroups {
      name
      website_url
      address
    
      validators {
        name
        address
        stats{
          epoch_num
          last_elected
          attestations_requested
          attenstations_fulfilled
          score
        } 
      }
      stats{
        epoch_num
        votes
        locked_gold
        voting_cap
        reward_ratio
        group_share
        attestation_percentage
      }
    }
  }
`;

export default function useValidatorGroup() {
  const [result, _] = useQuery({
    query: VG_Query,
  });
  return result;
}
