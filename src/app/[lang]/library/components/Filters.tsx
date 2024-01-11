import Select from '@/app/[lang]/library/components/Select';
import { Box, Typography } from '@mui/material';
import CategoryBadge from '@/app/[lang]/library/components/CategoryBadge';
import CheckIcon from '@mui/icons-material/Check';
import { getDictionary } from '@/utils/dictionary';
import { Dispatch, SetStateAction, useContext } from 'react';
import { LangContext } from '@/context/LangContextProvider';
import { useCategories } from '@/hooks/useCategories';
import { OrderByType, SortByType } from '@/app/[lang]/library/components/Content';

interface FiltersProps {
	sortBy: SortByType,
	setSortBy: Dispatch<SetStateAction<SortByType>>,
	orderBy: OrderByType,
	setOrderBy: Dispatch<SetStateAction<OrderByType>>,
	pageSize: number,
	setPageSize: Dispatch<SetStateAction<number>>,
	setPage: Dispatch<SetStateAction<number>>,
	selectedCategories: string[],
	setSelectedCategories: Dispatch<SetStateAction<string[]>>
}

export default function Filters({
	sortBy,
	setSortBy,
	orderBy,
	setOrderBy,
	pageSize,
	setPageSize,
	setPage,
	selectedCategories,
	setSelectedCategories
}: FiltersProps) {
	const { lang } = useContext(LangContext);
	const { page: { library: libraryPage } } = getDictionary(lang);
	const { categories } = useCategories();

	const handleClickCategory = (clickedCategory: string) => {
		setPage(1);
		if(selectedCategories.includes(clickedCategory)) {
			const updated = selectedCategories.filter(category => category !== clickedCategory);
			setSelectedCategories(updated);
		} else {
			setSelectedCategories([...selectedCategories, clickedCategory]);
		}
	};

	return (
		<Box alignSelf="center">
			<Select value={ sortBy } onChange={ e => setSortBy(e.target.value as SortByType) }>
				<option value="created_at">{ libraryPage.filters.sorts.created_at }</option>
				<option value="word">{ libraryPage.filters.sorts.word }</option>
				<option value="progress">{ libraryPage.filters.sorts.progress }</option>
			</Select>
			<Select value={ orderBy } onChange={ e => setOrderBy(e.target.value as OrderByType) }>
				<option value="asc">{ libraryPage.filters.orders.asc }</option>
				<option value="desc">{ libraryPage.filters.orders.desc }</option>
			</Select>
			<Select value={ pageSize.toString() } onChange={ e => setPageSize(Number(e.target.value)) }>
				<option value={ 5 }>5</option>
				<option value={ 10 }>10</option>
				<option value={ 25 }>25</option>
				<option value={ 50 }>50</option>
				<option value={ 100 }>100</option>
			</Select>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Typography fontFamily="Montserrat" fontSize="16px">Categories:</Typography>
				{ categories.map(category => {
					const isSelected = selectedCategories.includes(category.title);
					return <CategoryBadge
						key={ category.id }
						isSelected={ isSelected }
						onClickBadge={ () => handleClickCategory(category.title) }
					>
						{ isSelected && <CheckIcon fontSize="inherit" sx={ {
							position: 'absolute',
							left: 3,
							color: '#2886DE'
						} }/> }
						{ category.title }
					</CategoryBadge>;
				}) }
			</Box>
		</Box>
	);
};