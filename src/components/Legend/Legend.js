import React from 'react'
import styled from 'styled-components'

const LegendContainer = styled.div`
  transform: scale(0.3) translate3d(-392px, 450px, 0);
  position: absolute;
  bottom: 12px;
  left: 12px;
  width: 300px;
  border: solid 2px #808080;
  border-radius: 3px;
  background-color: #e8e3db;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  padding: 12px;

  @media only screen and (max-width: 767px) {
    display: none;
  }

  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1) translate3d(0, 0, 0);
  }
`

const LegendIcon = styled.i`
  color: white;
  font-size: 60px;
  text-shadow: 2px 2px 4px #808080;
  margin: 8px;
  min-width: 60px;
`

const OnCampus = styled(LegendIcon).attrs(props => ({ className: 'ion-md-star' }))``
const External = styled(LegendIcon).attrs(props => ({ className: 'ion-md-square' }))``
const Cloud = styled(LegendIcon).attrs(props => ({ className: 'ion-md-cloud' }))``

const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Label = styled.span`
  color: #363534;
  font-size: 18px;
`

const Node = props => {
  const Icon = props.icon
  return (
    <NodeContainer>
      <Icon />
      <Label>{props.label}</Label>
    </NodeContainer>
  )
}

const EdgeContainer = styled(NodeContainer)`
  margin-top: 12px;
  margin-bottom: 24px;
`

const EdgeStyle = styled.div`
  width: 45px;
  min-width: 45px;
  border-top: ${({ dashed }) => dashed ? 'dashed' : 'solid'} ${({ color }) => color} 4px;
`

const EdgeStyleContainer = styled.div`
  width: 60px;
  min-width: 60px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Edge = props => {
  const { color, label, dashed } = props
  return (
    <EdgeContainer>
      <EdgeStyleContainer>
        <EdgeStyle color={color} dashed={dashed} />
      </EdgeStyleContainer>
      <Label >{label}</Label>
    </EdgeContainer>
  )
}

export const Legend = props => {
  return (
    <LegendContainer>
      <Node icon={OnCampus} label='On Campus System' />
      <Node icon={External} label='External System' />
      <Node icon={Cloud} label='Cloud System' />
      <Edge color='#005481' dashed label='Built-in Interface' />
      <Edge color='#9e6614' label='Custom Interface' />
    </LegendContainer>
  )
}
