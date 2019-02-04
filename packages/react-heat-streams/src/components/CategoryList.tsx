import * as React from 'react'
import autobind from 'autobind-decorator'
import {
	ICategory,
	ICategoryValueMap,
	IColorizer,
	IScaler,
	Scrub,
	XDomain,
} from '../interfaces'
import Axis from './Axis'
import Backboard from './Backboard'
import CategoryChartList from './CategoryChartList'
import CategoryNameList from './CategoryNameList'
import Overlay from './Overlay'
import TimeScrub from './TimeScrub'

export interface ICategoryListProps {
	axisHeight: number
	width: number
	height: number
	axisOffset: number
	textPercent: number
	showCategories: boolean
	categories: ICategory[]
	categoryValues: ICategoryValueMap
	rowHeight: number
	highlightColor: string
	numAxisTicks: number
	xDomain: XDomain
	categoryY: (index: number) => number
	categoryNameFormat: string
	colorizer: IColorizer
	xScale: IScaler
	showValues: boolean
	isCategorySelected: (category: ICategory) => boolean
	sliceWidth: number
	onClickCategory: (category: ICategory, ctrlKey: boolean) => void
	onClick: (x: number, y: number, ctrlKey: boolean) => void
	onScrub: (bounds: Scrub) => void
	onScroll: (deltaX: number, deltaY: number) => void
	onClear: () => void
	xPan: number
	timeScrub: Array<number | Date>
}

export default class CategoryList extends React.PureComponent<
	ICategoryListProps
> {
	public render() {
		const {
			axisHeight,
			width,
			height,
			axisOffset,
			textPercent,
			showCategories,
			categories,
			categoryValues,
			rowHeight,
			highlightColor,
			categoryY,
			categoryNameFormat,
			colorizer,
			xScale,
			showValues,
			isCategorySelected,
			sliceWidth,
			onClick,
			onClickCategory,
			onScroll,
			onScrub,
			onClear,
			xPan,
			timeScrub,
			numAxisTicks,
			xDomain,
		} = this.props
		return (
			<g className="category-list" onWheel={this.onWheel}>
				<CategoryNameList
					categories={categories}
					showCategories={showCategories}
					width={width * textPercent}
					rowHeight={rowHeight}
					categoryY={categoryY}
					categoryNameFormat={categoryNameFormat}
					isCategorySelected={isCategorySelected}
					onClickCategory={onClickCategory}
					onClear={onClear}
				/>
				<Backboard
					width={width - textPercent * width}
					x={textPercent * width}
					height={height}
					onClick={onClear}
				/>
				<CategoryChartList
					categories={categories}
					categoryValues={categoryValues}
					xScale={xScale}
					colorizer={colorizer}
					rowHeight={rowHeight}
					showValues={showValues}
					width={width}
					highlightColor={highlightColor}
					isCategorySelected={isCategorySelected}
					categoryY={categoryY}
					sliceWidth={sliceWidth}
					xPan={xPan}
					xDomain={xDomain}
				/>
				<TimeScrub
					data={timeScrub}
					xScale={xScale}
					height={axisOffset}
					color={highlightColor}
				/>
				<Axis
					x={width * textPercent}
					xPan={xPan}
					offset={axisOffset}
					xScale={xScale}
					timeScrub={timeScrub}
					height={axisHeight}
					width={width - width * textPercent}
					numTicks={numAxisTicks}
				/>
				<Overlay
					width={width - textPercent * width}
					x={textPercent * width}
					height={axisOffset + axisHeight}
					xScale={xScale}
					onDrag={this.onDragOverlay}
					timeScrub={timeScrub}
					highlightColor={highlightColor}
					onClick={onClick}
				/>
			</g>
		)
	}

	private onWheel = (evt: React.WheelEvent<SVGGElement>) =>
		this.props.onScroll(evt.deltaX, evt.deltaY)

	private onDragOverlay = (bounds: Array<number | Date>) =>
		this.props.onScrub(bounds)
}
