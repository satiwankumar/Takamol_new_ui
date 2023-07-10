import styled, { css } from 'styled-components';

const BoxTitle = styled.span(
  () => css`
    text-transform: uppercase;
  `,
);

BoxTitle.displayName = 'EconomicActivity--BoxTitle';

const ActivityName = styled.span(
  () => css`
    text-transform: capitalize;
  `,
);

ActivityName.displayName = 'EconomicActivity--ActivityName';

export const Styled = {
  BoxTitle,
  ActivityName,
};
