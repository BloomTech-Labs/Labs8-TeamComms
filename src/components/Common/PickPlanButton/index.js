import styled from 'styled-components'
import PrimaryButton from '../PrimaryButton'
const PickPlanButton = styled(PrimaryButton)`
  background: #facc43;
  width: 300px;
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  font-weight: bold;
  color: #374353;
  :hover {
    color: #25bea0;
  }
  @media (max-width: 768px) {
    width: 250px;
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    width: 115px;
    font-size: 0.65rem;
  }
`

export default PickPlanButton
